# DNS for AI Discovery (DNS-AID)

These records are **not** applied by CloudFormation. Add them in your DNS provider for `<your-domain>` after enabling DNSSEC on the zone.

## Recommended records

### Catalog pointer (TXT)

```
Name:  _catalog._agents
Type:  TXT
TTL:   Auto
Content: url=https://<your-domain>/.well-known/ai-catalog.json
```

### Index / HTTPS service mode (experimental DNS-AID)

```
Name:  _index._agents
Type:  HTTPS  (or SVCB if available)
Priority: 1
Target: <your-domain>
Value: alpn="h2,h3" port=443
```

If your provider only supports raw SVCB/HTTPS:

```
_index._agents.<your-domain>. 3600 IN HTTPS 1 <your-domain>. alpn="h2,h3" port=443
```

### Optional A2A placeholder (only if you later host an A2A agent)

```
_a2a._agents.<your-domain>. 3600 IN SVCB 1 <your-domain>. alpn="h2" port=443
```

## DNSSEC

1. Enable DNSSEC in your DNS provider dashboard  
2. Add the DS record at the registrar if the DNS host is not also the registrar  

Validating resolvers (used by isitagentready.com via DoH) require DNSSEC for authenticated DNS-AID data.

## Validate

```bash
curl -s 'https://cloudflare-dns.com/dns-query?name=_catalog._agents.<your-domain>&type=TXT' \
  -H 'accept: application/dns-json'
```
