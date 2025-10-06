
const fs = require('fs');
const assert = require('assert');

try {
  const mcpData = fs.readFileSync('./.idx/mcp.json', 'utf8');
  const mcpConfig = JSON.parse(mcpData);

  assert.ok(mcpConfig.mcpServers, 'mcpServers key should exist');
  assert.strictEqual(typeof mcpConfig.mcpServers, 'object', 'mcpServers should be an object');

  assert.ok(mcpConfig.mcpServers.okdtts, 'okdtts key should exist');
  assert.strictEqual(typeof mcpConfig.mcpServers.okdtts, 'object', 'okdtts should be an object');

  assert.strictEqual(typeof mcpConfig.mcpServers.okdtts.command, 'string', 'command should be a string');
  assert.ok(Array.isArray(mcpConfig.mcpServers.okdtts.args), 'args should be an array');

  console.log('MCP config validation successful!');
} catch (error) {
  console.error('MCP config validation failed:', error.message);
  process.exit(1);
}
