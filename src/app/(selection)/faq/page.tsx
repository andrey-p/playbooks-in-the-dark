import QuestionAnswer from './components/question-answer';
import Heading from '../components/heading';
import Separator from '../components/separator';

const questionsAnswers = [
  {
    id: 'what-is-this',
    question: 'What is this?',
    answer: `<p>Blades in the Dark is an excellent, flexible system. There's a mind-boggling variety of Forged in the Dark systems that take apart the building blocks of the base ruleset and rearrange them in new ways.</p>
<p>There's a few really good character builders out there for Blades in the Dark. If they were to exist for other FitD systems, they would have to be created from scratch, which makes the whole business a lot more difficult.</p>
<p>The goal of this project is to take advantage of the common elements between BitD and FitD to make setting up new systems, characters, crews, etc as easy as possible.</p>`
  },
  {
    id: 'what-isnt-this',
    question: "What isn't this?",
    answer: `<p>
      This is not a VTT.
    </p>
    <p>
      The goal of this project is to optimise for versatility over depth - which means it only cares about what the character sheet behaves like, leaving details like what dice to roll and when to its users.
    </p>
    <p>
      For dice rolling etc, it's up to you - either physical dice or a Discord bot will scratch your itch.
    </p>`
  },
  {
    id: 'saving',
    question: 'How does saving work?',
    answer: `<p>
        After saving a playbook for the first time, you can copy either an
        <strong>editable link</strong> or a <strong>read-only link</strong>.
      </p>
      <p>
        The <strong>editable link</strong> allows anyone to update (and
        potentially delete!) your playbook. Only send it to yourself and your
        close allies.
      </p>
      <p>
        The <strong>read-only link</strong> allows anyone to look at, but not
        mess with, your playbook. Send it to acquaintances and potential
        turncoats.
      </p>
      <p>
        The linked playbooks on the homepage are stored in your browser&apos;s
        local storage. To access a playbook on a different device, use an
        <strong>editable link</strong>.
      </p>
      <p>
        There is currently no way to assert ownership of a saved playbook.
      </p>`
  },
  {
    id: 'can-you-add',
    question:
      "Can you add this FitD system / hack that I'd really like to play?",
    answer: `<p>
      If it's an established system that many people are interested in playing, absolutely! Get in touch.
    </p>
    <p>
      If it's a custom system, something in development or something for a one-shot, don't fret. This was pretty much the use case I started building this in mind with. There's currently no support for these, but I'm planning to add it in the future.
    </p>`
  },
  {
    id: 'how-do-i-add',
    question: 'How do I add or improve on a system?',
    answer: `<p>
      Documentation is still pending.
    </p>
    <p>
      Until that happens, you can look at <a href='https://github.com/andrey-p/playbooks-in-the-dark/tree/main/src/systems' target='_blank'>how the existing systems are implemented</a>.
    </p>
    <p>
      Alternatively, get in touch for help.
    </p>`
  },
  {
    id: 'contact',
    question: 'How do I contact you?',
    answer: `<p>
      Look for \`andrey-p\` on the <a href='https://discord.gg/BhPz76jU'>Blades in the Dark Discord</a>, open an issue on the <a href='https://github.com/andrey-p/playbooks-in-the-dark' target='_blank'>Github repo</a>, or email \`pitd [dot] feedback [at] pm [dot once more] me\` (no spaces).
    </p>`
  }
];

export default function FAQ() {
  return (
    <div>
      <Heading>FAQ</Heading>
      {questionsAnswers.map((qa) => (
        <div key={qa.id}>
          <QuestionAnswer
            id={qa.id}
            key={qa.id}
            question={qa.question}
            answer={qa.answer}
          />
          <Separator />
        </div>
      ))}
    </div>
  );
}
