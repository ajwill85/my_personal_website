/**
 * WebMCP tool registration for browser-based agents.
 * Spec: https://webmachinelearning.github.io/webmcp/
 */
export function registerWebMcpTools() {
  if (typeof navigator === 'undefined') return;

  const modelContext = navigator.modelContext;
  if (!modelContext || typeof modelContext.registerTool !== 'function') {
    return;
  }

  const tools = [
    {
      name: 'navigate_site',
      description:
        'Navigate the ajwill.ai portfolio SPA to a section: home, skills, projects, blog, certifications, or experience.',
      inputSchema: {
        type: 'object',
        properties: {
          section: {
            type: 'string',
            enum: ['home', 'skills', 'projects', 'blog', 'certifications', 'experience'],
          },
        },
        required: ['section'],
      },
      execute: async ({ section }) => {
        const hash = section === 'home' ? 'home' : section;
        window.location.hash = hash;
        return { ok: true, section: hash, url: window.location.href };
      },
    },
    {
      name: 'open_blog_post',
      description: 'Open a published blog post by slug on ajwill.ai.',
      inputSchema: {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            description: 'Blog post slug, e.g. three-legged-trust-stool',
          },
        },
        required: ['slug'],
      },
      execute: async ({ slug }) => {
        window.location.hash = `blog/${slug}`;
        return { ok: true, slug, url: window.location.href };
      },
    },
    {
      name: 'get_contact_email',
      description: 'Return the public contact email for Akeem Williams.',
      inputSchema: {
        type: 'object',
        properties: {},
      },
      execute: async () => ({
        email: 'aj@ajwill.ai',
        mailto: 'mailto:aj@ajwill.ai',
      }),
    },
  ];

  for (const tool of tools) {
    try {
      modelContext.registerTool(tool);
    } catch (err) {
      console.warn('WebMCP registerTool failed:', tool.name, err);
    }
  }
}
