const assert = require('assert');
const axios = require('axios');
const SchemaManager = require('../index.js');

async function main() {
    const response = await axios.get('https://sku.pricedb.io/api/schema');
    const manager = new SchemaManager({ updateTime: -1 });
    manager.setSchema(response.data);
    const schema = manager.schema;

    assert.strictEqual(schema.getSkuFromName('Summer 2026 Cosmetic Case'), '5978;6;c151');
    assert.strictEqual(schema.getSkuFromName('Summer 2026 War Paint Case'), '5980;6;c152');
    assert.strictEqual(schema.getName({ defindex: 5978, quality: 6, crateseries: 151 }), 'Summer 2026 Cosmetic Case #151');
    assert.strictEqual(schema.getName({ defindex: 5980, quality: 6, crateseries: 152 }), 'Summer 2026 War Paint Case #152');
    assert.strictEqual(schema.getSkuFromName("L'Etranger"), '224;6');
    assert.strictEqual(schema.getSkuFromName("L'Étranger"), '224;6');
    assert.strictEqual(schema.getSkuFromName("Strange L'Etranger"), '224;11');
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
