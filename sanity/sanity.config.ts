import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, structure} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Holy Visions',

  projectId: 'bgbuxtjs',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
