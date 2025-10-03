import {defineType, defineField} from 'sanity'
import {FaGear} from 'react-icons/fa6'
import {StructureResolver} from 'sanity/structure'

const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: FaGear,
  fields: [
    defineField({
      name: 'contestEnabled',
      title: 'Contest Enabled',
      description: 'Toggle this to OFF to remove the winning Vision from the site',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
      initialValue: true,
    }),
  ],
  preview: {
    prepare: () => {
      return {title: 'Holy Visions'}
    },
  },
})

export const structure: StructureResolver = async (S, context) => {
  return S.editor().id('settings').schemaType('settings').title('Settings')
}

export const schemaTypes = [settings]
