const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'rrsnwe4c',
  dataset: 'production',
  apiVersion: '2024-06-01',
  useCdn: false,
});

async function run() {
  try {
    const data = await client.fetch(`*[_type == "product"][0...2] { name }`);
    console.log("Success:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
