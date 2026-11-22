const assert = require('node:assert/strict');
const test = require('node:test');
const {
  buildHandler,
  escapeHtml,
  renderEmail,
  validateSubmission,
  FIELD_LIMITS,
} = require('./index.js');

function postEvent(body, extra = {}) {
  return {
    httpMethod: 'POST',
    headers: { origin: 'https://ajwill.ai' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
    ...extra,
  };
}

function validPayload(overrides = {}) {
  return {
    fullName: 'Ada Lovelace',
    email: 'ada@example.com',
    company: 'Analytical Engines',
    budget: '10k',
    message: 'Hello from the form.',
    ...overrides,
  };
}

function capturingClient() {
  const commands = [];
  return {
    commands,
    send: async (command) => {
      commands.push(command);
      return { MessageId: 'test-message' };
    },
  };
}

function testHandler() {
  const client = capturingClient();
  const handler = buildHandler(client, (input) => ({ input }));
  return { client, handler };
}

test('escapeHtml encodes characters used in HTML', () => {
  assert.equal(
    escapeHtml(`A&B <tag> "q" 's'`),
    'A&amp;B &lt;tag&gt; &quot;q&quot; &#39;s&#39;'
  );
});

test('validateSubmission accepts a normal contact payload', () => {
  const result = validateSubmission(validPayload());
  assert.equal(result.ok, true);
  assert.equal(result.value.fullName, 'Ada Lovelace');
});

test('validateSubmission rejects missing required fields, bad email, and overlong values', () => {
  assert.equal(validateSubmission({ email: 'ada@example.com', message: 'Hi' }).error, 'Missing required fields');
  assert.equal(validateSubmission(validPayload({ email: 'not-an-email' })).error, 'Invalid email address');
  assert.equal(
    validateSubmission(validPayload({ fullName: 'A'.repeat(FIELD_LIMITS.fullName + 1) })).error,
    'A field is too long'
  );
  assert.equal(
    validateSubmission(validPayload({ message: 'm'.repeat(FIELD_LIMITS.message + 1) })).error,
    'A field is too long'
  );
  assert.equal(validateSubmission(validPayload({ fullName: 'Ada\nLovelace' })).error, 'Invalid request');
  assert.equal(validateSubmission(validPayload({ email: 123 })).error, 'Invalid request');
  assert.equal(validateSubmission(['nope']).error, 'Invalid request');
});

test('renderEmail encodes user fields in HTML and leaves the text part readable', () => {
  const fields = {
    fullName: 'Ada <script>',
    email: 'ada@example.com',
    company: 'A&B',
    budget: '10 "k"',
    message: 'Hello\n<script>alert(1)</script>',
  };
  const rendered = renderEmail(fields);

  assert.match(rendered.html, /Ada &lt;script&gt;/);
  assert.match(rendered.html, /A&amp;B/);
  assert.match(rendered.html, /10 &quot;k&quot;/);
  assert.match(rendered.html, /Hello\n&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(rendered.html, /href="mailto:ada@example.com"/);
  assert.equal(rendered.html.includes('<script>'), false);
  assert.match(rendered.text, /Ada <script>/);
  assert.match(rendered.subject, /Ada <script>/);
});

test('handler rejects malformed requests before sending mail', async () => {
  const { client, handler } = testHandler();

  const missing = await handler(postEvent(''));
  assert.equal(missing.statusCode, 400);

  const invalid = await handler(postEvent('{'));
  assert.equal(invalid.statusCode, 400);
  assert.equal(JSON.parse(invalid.body).error, 'Invalid request');

  const tooLong = await handler(postEvent('x'.repeat(20001)));
  assert.equal(tooLong.statusCode, 400);

  assert.equal(client.commands.length, 0);
});

test('handler sends encoded HTML for a valid submission', async () => {
  const { client, handler } = testHandler();
  const response = await handler(postEvent(validPayload({
    fullName: "Ada O'Brien <admin>",
    company: '',
    budget: null,
  })));

  assert.equal(response.statusCode, 200);
  assert.equal(JSON.parse(response.body).success, true);
  assert.equal(client.commands.length, 1);

  const html = client.commands[0].input.Message.Body.Html.Data;
  const text = client.commands[0].input.Message.Body.Text.Data;
  assert.match(html, /Ada O&#39;Brien &lt;admin&gt;/);
  assert.match(html, /Not provided/);
  assert.match(text, /Not provided/);
  assert.equal(html.includes('<admin>'), false);
});

test('handler answers CORS preflight', async () => {
  const { handler } = testHandler();
  const response = await handler({
    httpMethod: 'OPTIONS',
    headers: { origin: 'https://www.ajwill.ai' },
  });
  assert.equal(response.statusCode, 200);
  assert.equal(response.headers['Access-Control-Allow-Origin'], 'https://www.ajwill.ai');
});
