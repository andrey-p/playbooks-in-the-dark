# Playbooks in the Dark

**Playbooks in the Dark** is a modular, configurable character / crew / anything else sheet builder for the [Blades in the Dark](https://bladesinthedark.com/) RPG system and other [Forged in the Dark](https://bladesinthedark.com/forged-dark) systems.

You can find **Playbooks in the Dark** running at [thedark.iswhywecanthavenicethings.fyi](https://thedark.iswhywecanthavenicethings.fyi/).

## What is this?

Blades in the Dark is an excellent, flexible system. There's a mind-boggling variety of Forged in the Dark systems that take apart the building blocks of the base ruleset and rearrange them in new ways.

There's a few really good character builders out there for Blades in the Dark. If they were to exist for other FitD systems, they would have to be created from scratch, which makes the whole business a lot more difficult.

The goal of this project is to take advantage of the common elements between BitD and FitD to make setting up new systems, characters, crews, etc as easy as possible.

**Playbooks in the Dark** allows for custom playbook layouts to be easily defined via JSON files, then used by players who want to play a given system.

## What this isn't

**Playbooks in the Dark** is not a VTT - it knows nothing about the actual rules of each system. It only cares about the behaviour of the character sheet. Players will still need to know what each of the elements on the sheet represents, what dice they need to roll, when to click or unclick things.

This project optimizes for flexibility at the expense of depth. Because of this, certain bits of the character sheets will not look like the original PDFs.

## Project structure

Proper documentation (including documentation for people who want to add more systems) is still pending. In the meantime, here's a quick technical overview.

### JSON files

The JSON data files for each system are located in `src/systems/`. Of those:

- `system.json` is the entry point. Amongst other things, it defines a list of playbook types (e.g. `scoundrel`, `crew`).
- Playbook definition files (`scoundrel.json`, `crew.json`) define a specific type of playbook. The `modules` property lists a set of modules, each of which can be configured to look like a piece of a printed BitD / FitD sheet. The `layout` property determines how these modules are arranged: first by column, then by row. Each playbook definition file also specifies the available playbooks of that type (e.g. `bravos` and `assassins` in `crew.json`).
- Playbook data files (`hound.json`, `assassins.json`) define a specific instance of a playbook. The main purpose of these files is to configure modules with contents specific to that playbook (e.g. the special abilities unique to a Hound).

These files are read by the app at runtime. Because of this, their structure is beyond what Typescript can verify - the contents of each file are validated at runtime by [Zod schemas](https://zod.dev/).

In order to make sure all data files produce usable playbooks, all system, playbook definition and playbook data files are [validated during CI](https://github.com/andrey-p/playbooks-in-the-dark/blob/main/src/systems/system.test.tsx).

### Playbook modules

Playbook modules are individual repeatable units of UI that **Playbooks in the Dark** uses to build up playbooks. They live in `src/components/playbook-modules`.

Each module takes three pieces of config:

- `moduleDefinition`: This comes from the playbook definition file. It contains config values that are (more or less) shared across all playbooks of that type. `moduleDefinition` has a few common properties that all modules support (e.g. `label`, `description`). Ones that are specific to the module are under `moduleDefinition.props`.
- `playbookProps` contains any relevant playbook-specific config from the playbook data files.
- `userValue` is whatever user-initiated changes the module supports, e.g. any text entered, any toggles clicked, etc.

The shape of these varies for every module, and is codified, again, by Zod schemas. Every module has its own set of schemas - see, for example [the schemas for the Items module](https://github.com/andrey-p/playbooks-in-the-dark/blob/main/src/components/playbook-modules/items/items.schema.ts).

## Setting up for development

### System development

If all you want to do is add / tweak your favourite FitD system, you can just do:

```
npm install && npm run dev
```

Saving will not work.

### More involved development

This project is built with React and NextJS via [SST](https://sst.dev/) and so requires an AWS account. Once you've got your AWS credentials set up (under `playbooks-project-dev`), you can run this project locally in the usual style:

```
npm install && npm start
```

## Rough roadmap

Running up to a tentative beta release:

- [x] set up production site
- [x] add mobile support
- [x] data entry for BitD characters
- [x] improve character saving flow
- [x] add BitD crews
- [x] add user-friendly error handling
- [ ] add the first non-bitd system
- [ ] add loading states

Future:

- [ ] add support for Deep Cuts content
- [ ] improve saved playbook ownership model
- [ ] add auto-update for anyone else viewing the same playbook
- [ ] better accessibility
- [ ] translation support

## License

All Blades in the Dark content (and Forged in the Dark content, too) is attributed thusly:

> This work is based on [Blades in the Dark](http://www.bladesinthedark.com/), product of One Seven Design, developed and authored by John Harper, and licensed for our use under the [Creative Commons Attribution 3.0 Unported license](http://creativecommons.org/licenses/by/3.0/).

Other systems (as they get added) will have their own license text in their `system.json` file.

All code in this repo is licensed under MIT.
