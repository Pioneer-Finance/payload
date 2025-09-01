import * as migration_20241125_222020_initial from './20241125_222020_initial';
import * as migration_20241214_124128 from './20241214_124128';
import * as migration_20250829_042702 from './20250829_042702';
import * as migration_20250901_024600_logo_fields from './20250901_024600_logo_fields';
import * as migration_20250901_025239_logo_size_fields from './20250901_025239_logo_size_fields';
import * as migration_20250901_034237_accordion_block from './20250901_034237_accordion_block';
import * as migration_20250901_045523_richtext_block from './20250901_045523_richtext_block';

export const migrations = [
  {
    up: migration_20241125_222020_initial.up,
    down: migration_20241125_222020_initial.down,
    name: '20241125_222020_initial',
  },
  {
    up: migration_20241214_124128.up,
    down: migration_20241214_124128.down,
    name: '20241214_124128',
  },
  {
    up: migration_20250829_042702.up,
    down: migration_20250829_042702.down,
    name: '20250829_042702',
  },
  {
    up: migration_20250901_024600_logo_fields.up,
    down: migration_20250901_024600_logo_fields.down,
    name: '20250901_024600_logo_fields',
  },
  {
    up: migration_20250901_025239_logo_size_fields.up,
    down: migration_20250901_025239_logo_size_fields.down,
    name: '20250901_025239_logo_size_fields',
  },
  {
    up: migration_20250901_034237_accordion_block.up,
    down: migration_20250901_034237_accordion_block.down,
    name: '20250901_034237_accordion_block',
  },
  {
    up: migration_20250901_045523_richtext_block.up,
    down: migration_20250901_045523_richtext_block.down,
    name: '20250901_045523_richtext_block'
  },
];
