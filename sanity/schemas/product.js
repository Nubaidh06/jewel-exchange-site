export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Catalog Type',
      type: 'string',
      options: {
        list: [
          { title: 'Jewelry', value: 'Jewelry' },
          { title: 'Gemstones', value: 'Gemstones' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category (e.g. Rings, Sapphires)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Can be a number like $12,500 or text like "Price Upon Request"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'Turn this on to display this piece in the Homepage Featured Carousel.',
      initialValue: false,
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'img',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Additional Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      description: 'Upload optional additional views, multi-angle shots, or detail photos for this listing.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'img',
    },
  },
}
