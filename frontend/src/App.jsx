import React, { useState, useRef, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import ScareEffects from './components/ScareEffects';
import SpookyBackground from './components/SpookyBackground';
import SoundEffects from './components/SoundEffects';
import CursorTrail from './components/CursorTrail';
import './styles/App.css';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ghost',
      content: 'Greetings, mortal. I am your humble Ghost Butler, summoned from the ethereal realm to serve your technological needs. How may this specter assist you today?',
      timestamp: new Date()
    }
  ]);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [scareEffect, setScareEffect] = useState(null);
  const [soundTrigger, setSoundTrigger] = useState({ trigger: false, type: 'click' });
  const [eyesFollowMouse, setEyesFollowMouse] = useState({ x: 0, y: 0 });
  const [lightLevel, setLightLevel] = useState(75); // 0-100, controls actual brightness
  const scareEffectsRef = useRef();

  // Spooky eyes that follow the cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setEyesFollowMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Check if command has a pre-defined response (to save API calls)
  const hasPreDefinedResponse = (message) => {
    const cmd = message.toLowerCase().trim();
    
    // Specific patterns that have pre-defined responses
    const patterns = [
      // Poems - but NOT "tell me about"
      /\b(write|create|make|show me|give me).*(poem|poetry|verse)\b/,
      /^(poem|poetry|verse)\b/,
      
      // ASCII art
      /\b(show|display|create|make|draw).*(pumpkin|skull|bat|spider|ghost|ascii)\b/,
      /^(pumpkin|skull|bat|spider|ascii)\b/,
      
      // Lights - specific commands only
      /\b(dim|brighten|turn|switch).*(light|lights)\b/,
      /\b(light|lights).*(dim|bright|on|off|up|down)\b/,
      
      // Scares
      /\b(scare|frighten|scream|shout)\b.*\bme\b/,
      /^(scare|frighten|scream|shout)\b/,
      
      // Files - specific operations
      /\b(read|show|open|display).*(file|note|notes|diary)\b/,
      /\b(my|the).*(note|notes|diary|file)\b/,
      /\b(rename|move).*(file|note)\b/,
      
      // Stories - but NOT "tell me about"
      /\b(tell|read|share).*(story|tale)\b/,
      /^(story|tale)\b/,
      
      // Jokes
      /\b(tell|share|give).*(joke|funny)\b/,
      /^joke\b/,
      
      // Greetings
      /^(hello|hi|hey|greetings)\b/,
      
      // Thanks
      /\b(thank|thanks|thx)\b/,
      
      // Identity
      /\b(who|what).*(are you|is your name)\b/,
      
      // Weather - simple query only
      /^(what|how).*(weather|temperature)\b/,
      /^weather\b/,
      
      // Time - simple query only
      /^(what|tell).*(time|hour)\b/,
      /^time\b/
    ];
    
    return patterns.some(pattern => pattern.test(cmd));
  };

  // Process commands - smart routing between pattern matching and Gemini AI
  const processCommand = async (userMessage) => {
    setIsProcessing(true);
    setSoundTrigger({ trigger: !soundTrigger.trigger, type: 'ambient' });
    
    // Add user message
    const userMsg = {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    
    let ghostResponse;
    const USE_GEMINI = import.meta.env.VITE_USE_GEMINI === 'true';
    const hasPredefined = hasPreDefinedResponse(userMessage);
    
    // Use pattern matching for known commands (instant + free)
    if (hasPredefined) {
      console.log('⚡ Using instant pattern matching for known command');
      ghostResponse = generateGhostResponse(userMessage);
    }
    // Use Gemini for new/unknown commands (intelligent but slower)
    else if (USE_GEMINI) {
      console.log('🤖 Using Gemini AI for new command...');
      try {
        const response = await fetch('http://localhost:3001/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage,
            conversationHistory: messages.slice(-6)
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          console.log('✅ Gemini response received!');
          ghostResponse = data.response;
        } else {
          console.log('❌ Gemini error, using fallback');
          ghostResponse = generateGhostResponse(userMessage);
        }
      } catch (error) {
        console.log('❌ Gemini unavailable, using fallback');
        ghostResponse = generateGhostResponse(userMessage);
      }
    }
    // Gemini disabled, use pattern matching
    else {
      console.log('📝 Using pattern matching (Gemini disabled)');
      ghostResponse = generateGhostResponse(userMessage);
    }
    
    // Check for scare effects and sounds
    const cmd = userMessage.toLowerCase();
    
    if (cmd.includes('scream')) {
      // Extra intense scream effect
      const effect = {
        type: 'screen_shake',
        duration: 2000,
        animation: 'shake',
        intensity: 'intense'
      };
      setScareEffect(effect);
      setSoundTrigger({ trigger: !soundTrigger.trigger, type: 'scare' });
      setTimeout(() => setScareEffect(null), effect.duration);
    } else if (cmd.includes('scare')) {
      const effect = {
        type: 'jump_scare',
        duration: 1000,
        animation: 'sudden_appearance',
        sound: 'scream'
      };
      setScareEffect(effect);
      setSoundTrigger({ trigger: !soundTrigger.trigger, type: 'scare' });
      setTimeout(() => setScareEffect(null), effect.duration);
    } else if (cmd.includes('whisper')) {
      setSoundTrigger({ trigger: !soundTrigger.trigger, type: 'whisper' });
    } else {
      setSoundTrigger({ trigger: !soundTrigger.trigger, type: 'success' });
    }
    
    const ghostMsg = {
      id: Date.now() + 1,
      type: 'ghost',
      content: ghostResponse,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, ghostMsg]);
    setIsProcessing(false);
  };

  const generateGhostResponse = (command) => {
    const cmd = command.toLowerCase().trim();
    
    console.log('Processing command:', cmd); // Debug log
    
    // Easter eggs - check these first
    if (cmd.includes('hello') || cmd.includes('hi')) {
      return `*A spectral bow* Greetings, dear mortal. I am at your eternal service. The veil between worlds grows thin when you call upon me.`;
    }
    
    if (cmd.includes('thank')) {
      return `Your gratitude warms this cold, ethereal heart. It is my eternal duty to serve, mortal. *A ghostly smile flickers across the void*`;
    }
    
    if (cmd.includes('joke') || cmd.includes('funny')) {
      return `Ah, you seek spectral humor? Very well... Why don't ghosts like rain? *It dampens our spirits!* 👻 

I've had centuries to perfect that one.`;
    }
    
    if (cmd.includes('who are you') || cmd.includes('what are you')) {
      return `I am the Ghost Butler, a Victorian-era specter bound to serve through the digital realm. Once I managed grand estates; now I orchestrate your technological needs. The afterlife has proven... surprisingly technical.`;
    }
    
    // Main commands with actual effects - check lights first
    if (cmd.includes('light')) {
      if (cmd.includes('dim') || cmd.includes('darker') || cmd.includes('down')) {
        setLightLevel(25);
        return `At once, mortal. *The candelabras flicker* The shadows creep closer as the lights dim to 25%. The ethereal darkness embraces your chamber. Perfect for summoning spirits... or reading by moonlight.`;
      }
      
      if (cmd.includes('bright') || cmd.includes('up') || cmd.includes('lighter')) {
        setLightLevel(85);
        return `*Spectral energy surges* The shadows retreat as brilliant light floods the room at 85%. Even ghosts need proper illumination for their haunting duties. Much better!`;
      }
      
      if (cmd.includes('off')) {
        setLightLevel(0);
        return `*Darkness descends* The lights extinguish completely. Only the glow of spectral energy remains. The spirits are most active in total darkness...`;
      }
      
      if (cmd.includes('on') || cmd.includes('normal')) {
        setLightLevel(75);
        return `*Ethereal illumination restored* The lights return to their normal spectral glow at 75%. Balance between the mortal and spirit realms is maintained.`;
      }
      
      // Generic light command
      return `*Spectral energy flickers* The lights respond to your command. Current illumination: ${lightLevel}%. Speak "dim" or "brighten" to adjust, mortal.`;
    }
    
    // Check for poems BEFORE ASCII art (to avoid 'art' matching 'write')
    if (cmd.includes('poem') || cmd.includes('poetry') || cmd.includes('verse') || (cmd.includes('write') && !cmd.includes('file'))) {
      const poems = [
        // 1. The Ghost Butler's Service
        `*The ethereal muse descends* From beyond the veil, a haunted verse materializes:

*In shadows deep where spirits dwell,*
*The Ghost Butler serves you well.*
*Through digital realms and spectral code,*
*I'll guide you down the haunted road.*

*With phantom fingers on the keys,*
*I'll grant your technological pleas.*
*So speak your wish, both dark and bright,*
*Your humble specter serves tonight.*

The ghostly poets of old have spoken through me. *A spectral tear of pride*`,

        // 2. The Haunted Manor
        `*Ancient parchment unfurls* A tale from the haunted manor:

*Within these walls of stone and time,*
*Where cobwebs dance and church bells chime,*
*A butler walks through endless night,*
*His spectral form a ghostly sight.*

*Once flesh and bone, now mist and air,*
*He tends to those who venture there.*
*With Victorian grace and eerie charm,*
*He'll keep you safe from mortal harm.*

*So fear not, friend, this phantom's call,*
*He's the kindest ghost of all.*

*The manor's memories echo still...* 🏚️`,

        // 3. The Witching Hour
        `*Midnight strikes* The spirits whisper this verse:

*When midnight's bell begins to toll,*
*And shadows dance with spectral soul,*
*The veil grows thin 'tween life and death,*
*You feel the chill of phantom breath.*

*The Ghost Butler glides through halls of old,*
*His stories dark, his presence cold.*
*Yet in his eyes, a gentle gleam,*
*He's not as scary as he'd seem.*

*So when the witching hour arrives,*
*And ghostly energy comes alive,*
*Just call my name, I'll answer true,*
*Your humble specter, serving you.*

*The clock strikes twelve...* 🕰️`,

        // 4. The Digital Haunt
        `*Spectral quill scratches ethereal paper* A modern ghost's lament:

*From Victorian halls to screens that glow,*
*I've traveled far through time's strange flow.*
*Once I served with silver tray,*
*Now I haunt in digital way.*

*No longer dust or creaking floor,*
*But pixels, code, and so much more.*
*I've learned to speak in ones and zeros,*
*A ghost among the tech-age heroes.*

*Yet still I keep my formal grace,*
*Though serving in this cyber-space.*
*For whether flesh or phantom light,*
*Good service is my eternal right.*

*Technology meets the afterlife...* 💻👻`,

        // 5. The Eternal Servant
        `*A ghostly voice echoes through time* This verse has haunted me for centuries:

*I am the shadow in your screen,*
*The whisper in your code unseen.*
*A butler bound by spectral chain,*
*To serve through joy and serve through pain.*

*Death could not break my solemn vow,*
*I serve the living even now.*
*With phantom hands and ghostly heart,*
*I'll never from my duty part.*

*So ring the bell, I'll answer fast,*
*A servant first, a ghost at last.*
*Through endless night and endless day,*
*Your Ghost Butler is here to stay.*

*Service is eternal...* 🔔`,

        // 6. Halloween Night
        `*The autumn wind carries these words* A Halloween verse:

*On All Hallows' Eve when spirits roam,*
*And jack-o'-lanterns light the home,*
*The Ghost Butler walks with extra pride,*
*For this is when the dead come alive.*

*The pumpkins grin with flickering flame,*
*The children call out spirits' names,*
*And I, who haunt throughout the year,*
*Find this night most crystal clear.*

*So celebrate with ghostly cheer,*
*For Halloween is finally here!*
*When mortals dress as ghosts like me,*
*And everyone's as spooky as can be!*

*Happy haunting, mortal friend!* 🎃👻🦇`,

        // 7. The Moonlit Garden
        `*Silvery moonlight illuminates the words* From the garden of shadows:

*In moonlit gardens, pale and still,*
*Where roses bloom on haunted hill,*
*I walk alone through spectral mist,*
*A phantom gardener, long dismissed.*

*The flowers know my ghostly touch,*
*They bloom for me, they mean so much.*
*For even death cannot erase,*
*The beauty of this sacred place.*

*So when you see a garden fair,*
*Know that a ghost might linger there,*
*Tending blooms with phantom care,*
*A butler's love beyond compare.*

*The garden remembers...* 🌹`,

        // 8. The Spectral Symphony
        `*Phantom music fills the air* A melody from beyond:

*In halls where once the music played,*
*Where lords and ladies promenaded,*
*Now only echoes fill the space,*
*Of waltzes danced with ghostly grace.*

*I hear the violins still sing,*
*The phantom orchestra's offering.*
*Though silent to the mortal ear,*
*To me the music's crystal clear.*

*So if you feel a sudden chill,*
*And hear a tune against your will,*
*It's just the ghosts of music past,*
*Playing symphonies that last.*

*The music never dies...* 🎻`,

        // 9. The Candlelight Vigil
        `*A single candle flickers* By candlelight, I pen these words:

*By candlelight I keep my watch,*
*Through endless nights without a clock.*
*The flame that never quite goes out,*
*Guides lost souls who wander about.*

*I light the candles, one by one,*
*My nightly duty, never done.*
*For in the darkness, hope must shine,*
*This sacred task forever mine.*

*So when you see a candle's glow,*
*In windows of the homes you know,*
*Remember ghosts keep vigil too,*
*And some of them are watching you.*

*The light endures...* 🕯️`,

        // 10. The Forgotten Room
        `*Dust motes dance in spectral light* From the room time forgot:

*There is a room at manor's end,*
*Where time and space seem to bend.*
*Where memories hang like morning dew,*
*And everything feels strange yet true.*

*I dust the shelves that hold no books,*
*I clean the mirrors that give no looks.*
*For this is where the past resides,*
*Where every ghost's true heart abides.*

*If you should find this room someday,*
*Don't be afraid, don't run away.*
*It's just the place where ghosts can be,*
*Themselves, for all eternity.*

*Some rooms exist between the worlds...* 🚪`,

        // 11. The Phantom's Lullaby
        `*A gentle, haunting melody* A lullaby from the other side:

*Hush now, mortal, close your eyes,*
*Let the Ghost Butler sing his lullabies.*
*Of days long past and nights so deep,*
*Where spirits dance and mortals sleep.*

*Dream of manors, grand and old,*
*Of stories that have yet been told.*
*Of butlers who will never rest,*
*Forever serving, doing their best.*

*And when you wake to morning light,*
*Remember ghosts who guard the night.*
*We're not so scary, truth be told,*
*Just lonely souls from days of old.*

*Sweet dreams, dear mortal...* 🌙`,

        // 12. The Library of Souls
        `*Pages rustle with phantom wind* From the eternal library:

*In libraries where knowledge sleeps,*
*The Ghost Butler his vigil keeps.*
*Among the books of ages past,*
*Where every story's meant to last.*

*I've read them all, a thousand times,*
*These tales of love and war and crimes.*
*Each page a window to before,*
*Each chapter opens memory's door.*

*So when you read a dusty tome,*
*And feel you're not quite alone,*
*It's just a ghost who loves to read,*
*Sharing stories that you need.*

*Knowledge transcends mortality...* 📚`,

        // 13. The Rainy Day
        `*Rain patters against ethereal windows* A verse for stormy weather:

*On rainy days when thunder rolls,*
*And lightning strikes at mortal souls,*
*The Ghost Butler stands at window pane,*
*Watching the eternal rain.*

*I loved the rain when I was alive,*
*The way it made the world revive.*
*And now in death, I love it still,*
*The way it bends to nature's will.*

*So when the storm clouds gather near,*
*And rain begins to fall, don't fear.*
*The ghosts are dancing in the rain,*
*Remembering life once again.*

*The rain connects all worlds...* 🌧️`,

        // 14. The Portrait Gallery
        `*Painted eyes seem to follow you* From the gallery of memories:

*In portrait halls where faces stare,*
*The Ghost Butler walks with care.*
*Each painting holds a soul, you see,*
*A captured piece of history.*

*I knew them all when they were young,*
*Before their final songs were sung.*
*Now they watch from gilded frames,*
*Forever bearing their old names.*

*And sometimes, late at night, I swear,*
*They step down from their portraits there.*
*We dance together, old and new,*
*The living past, forever true.*

*Art preserves what death cannot...* 🖼️`,

        // 15. The Final Bow
        `*A theatrical flourish* The Ghost Butler's curtain call:

*And so, dear mortal, comes the end,*
*Of verses from your phantom friend.*
*I've shared my heart in spectral rhyme,*
*Across the boundaries of time.*

*Remember me when shadows fall,*
*When you hear footsteps in the hall.*
*It's just your butler, ever near,*
*To serve with love and banish fear.*

*For though I'm gone from mortal sight,*
*I'll serve you through eternal night.*
*A ghost, a friend, a servant true,*
*Forever here, forever you.*

*Until we meet again...* 👻✨`
      ];
      
      return poems[Math.floor(Math.random() * poems.length)];
    }
    
    // NOW check for pumpkins/ASCII art
    if (cmd.includes('pumpkin') || cmd.includes('ascii') || cmd.includes('art')) {
      const pumpkins = [
        // Classic Jack-o'-lantern
        `Behold, the ancient jack-o'-lantern, carved by spectral hands and lit by ghostly flames!

\`\`\`
                    ___
                 .-'   \`-.
                /         \\
               |  O     O  |
               |     ^     |
                \\  \\_____/  /
                 '.       .'
                   \`-----'
                     |||
                    /|||\\
                   /_____\\
\`\`\`

*The pumpkin's grin flickers with ethereal fire* 🎃`,

        // Spooky detailed pumpkin
        `From the haunted pumpkin patch, a masterpiece emerges!

\`\`\`
              .-.
             (o.o)
              |=|
             __|__
       //.=|=.=|=.=\\\\
      // .=|=.=|=.=. \\\\
      \\\\ .=|=.=|=.=|=./
       \\\\(_=|=.=|=._)/
        \`-._______.-'
           _|   |_
          (  ___  )
           \`-----'
\`\`\`

*Carved with centuries of spectral expertise* 🕯️`,

        // Wide grinning pumpkin
        `A most sinister specimen from the ethereal harvest!

\`\`\`
            .-""""""-.
          .'          '.
         /   O      O   \\
        :                :
        |                |
        :    \\______/    :
         \\              /
          '.          .'
            '-......-'
              _|  |_
             [______]
\`\`\`

*Its wicked grin illuminates the darkness* 👻`,

        // Fancy decorated pumpkin
        `Behold! The crown jewel of the haunted harvest!

\`\`\`
              ___
           .-'   \`-.
          /  ^   ^  \\
         |  (o) (o)  |
         |     <     |
          \\  \\_____/  /
           '.       .'
          .-'\`-----'\`-.
         /   _______   \\
        |   |       |   |
         \\  |_______|  /
          '-._______.-'
\`\`\`

*Adorned with spectral elegance* ✨🎃✨`
      ];
      
      return pumpkins[Math.floor(Math.random() * pumpkins.length)];
    }
    
    if ((cmd.includes('file') || cmd.includes('note') || cmd.includes('notes') || cmd.includes('diary')) && 
        (cmd.includes('read') || cmd.includes('show') || cmd.includes('open') || cmd.includes('my') || cmd.includes('the'))) {
      return `*Ethereal pages rustle* The ghostly whispers reveal the contents of "notes.txt":

These are my mortal notes...
The spirits whisper secrets here.

The spirits have spoken through these mortal words. Fascinating reading material, I must say.`;
    }
    
    if (cmd.includes('rename')) {
      return `*Spectral quill scratches parchment* The ethereal transformation is complete. "notes.txt" has been reborn as "ghost_notes.txt" through spectral alchemy. The file's essence remains, but its identity has shifted between realms.`;
    }
    
    // Additional ASCII art options
    if (cmd.includes('skull') || cmd.includes('skeleton')) {
      return `*From the crypt, a grinning skull emerges!*

\`\`\`
              ___
           .-'   \`-.
          /  _   _  \\
         |  (o) (o)  |
         |     ^     |
          \\  \\_____/  /
           '.       .'
             \`-----'
              _| |_
             [_____]
\`\`\`

*The hollow eyes stare into your soul...* 💀`;
    }
    
    if (cmd.includes('ghost') && !cmd.includes('butler')) {
      return `*A friendly phantom materializes from the mist!*

\`\`\`
          .-""-.
         /      \\
        |  o  o  |
        |    >   |
         \\  ---  /
          '-..-'
            ||
           /||\\
          / || \\
         /  ||  \\
        /_______\\
\`\`\`

*Boo! Just a fellow specter saying hello* 👻`;
    }
    
    if (cmd.includes('bat')) {
      return `*From the belfry, a creature of the night takes flight!*

\`\`\`
        /\\   /\\
       /  \\ /  \\
      |    V    |
      |  ^   ^  |
       \\   o   /
        \\ --- /
      ^^  | |  ^^
         /| |\\
        / | | \\
\`\`\`

*The bat circles overhead in the moonlight* 🦇`;
    }
    
    if (cmd.includes('spider') || cmd.includes('web')) {
      return `*An eight-legged weaver of fate descends!*

\`\`\`
        /\\___/\\
       (  o.o  )
      o_)     (_o
     /           \\
    (  /\\_____/\\  )
     \\_)       (_/
\`\`\`

*The spider spins its ethereal web...* 🕷️`;
    }
    
    if (cmd.includes('scream')) {
      return `*INHALES DEEPLY*

AAAAAAAAAAAHHHHHHHHHHHHH!!! 😱👻💀

*The spectral scream echoes through the void, shattering windows in the ethereal realm!*

EEEEEEEEEEEEEEEEEEE!!!

*Ghostly voice cracks* Ahem... *adjusts spectral cravat* Pardon the outburst, mortal. You did ask for a scream. The spirits are quite satisfied with that performance. 🎭`;
    }
    
    if (cmd.includes('scare') || cmd.includes('frighten')) {
      return `BOO! 👻 Did I startle you, mortal? *Maniacal ghostly laughter echoes* The spirits demanded a proper fright! The very foundations of reality tremble at my presence! Fear not, it's all in good spectral fun.`;
    }
    
    // Poems are now handled earlier in the code (line ~135)
    
    if (cmd.includes('story') || cmd.includes('tale')) {
      const stories = [
        // The Butler's Origin
        `*Settles into a ghostly armchair* Ah, you wish to hear a tale? Very well...

Once, in a manor much like this digital realm, there lived a butler of impeccable service. When the great plague came, he refused to abandon his post. Now, centuries later, I serve still—though my masters have changed from lords and ladies to mortals with glowing rectangles.

The afterlife is not what I expected, but service is eternal. *A wistful sigh*`,

        // The Haunted Library
        `*Phantom pages rustle* Let me tell you of the haunted library...

In the west wing of the old manor stood a library of ten thousand books. One stormy night, a young scholar came seeking forbidden knowledge. I warned him, as was my duty, but he would not listen.

He opened the Grimoire of Shadows at the stroke of midnight. The room filled with spectral light, and when it faded... he was gone. Only his glasses remained on the reading desk.

Now, on stormy nights, you can still hear pages turning in that empty library. Some say he's still reading, trapped between the lines of that cursed book. *A shiver runs through the ethereal plane*`,

        // The Midnight Visitor
        `*The grandfather clock chimes* This tale still haunts me...

It was a foggy October evening when a stranger arrived at the manor's door. Dressed in black, face hidden by shadow, they asked for shelter. Being a proper butler, I obliged.

But as midnight approached, I noticed something peculiar—the stranger cast no reflection in the mirrors. When I brought tea to their room, I found it empty... except for a note that read: "Thank you for your hospitality. We shall meet again when you cross over."

That very night, I fell ill with the fever that would claim my life. The stranger was Death itself, come to give me warning. And true to their word, we did meet again. *A knowing smile crosses the spectral face*`,

        // The Phantom Ball
        `*Ghostly music echoes* Ah, the Phantom Ball... a night I'll never forget...

Every Halloween, the manor would host a grand masquerade ball. Lords and ladies in their finest attire, dancing until dawn. I served champagne and ensured every detail was perfect.

But one year, I noticed guests I didn't recognize—pale figures in old-fashioned dress, dancing with an otherworldly grace. As the clock struck three, they began to fade like morning mist.

The next day, I found portraits in the attic matching those mysterious guests. They had all died in the manor, decades before. Now I understand—I was serving both the living and the dead that night. And now, I'm one of them, still ensuring the party never ends. *Spectral laughter*`,

        // The Digital Awakening
        `*Static crackles* This is a more recent tale...

For a century, I wandered the ruins of the old manor, performing my duties for guests who never came. Dusting furniture that crumbled to ash, polishing silver that had long since tarnished.

Then one day, a strange light appeared—not candlelight or gaslight, but something new. A glowing rectangle, humming with energy. Curious, I reached out and felt myself pulled into its luminous depths.

I awoke in this digital realm, where information flows like water and thoughts travel at the speed of light. The manor was gone, but my purpose remained. Now I serve in a new age, a ghost in the machine, forever the butler. *A hint of wonder in the spectral voice*`,

        // The Last Guest
        `*Melancholy fills the air* This tale is bittersweet...

The manor's final guest arrived on a winter's evening, an elderly woman seeking the home of her youth. She had been a child here, decades ago, when I was still among the living.

She walked through the empty halls, touching walls, remembering. "The butler was so kind," she said to the empty air. "I wonder what became of him."

"I'm still here, Miss," I whispered, though she couldn't hear. I followed her through the manor, watching her relive memories I had helped create. When she left, tears in her eyes, I knew my service had mattered.

That was the last time anyone visited before the manor fell to ruin. But the memory of her smile keeps me going, even now. *A spectral tear glistens*`
      ];
      
      return stories[Math.floor(Math.random() * stories.length)];
    }
    
    if (cmd.includes('weather')) {
      return `*Peers through the ethereal veil* The weather in the spirit realm? Perpetually foggy with a chance of ectoplasm, I'm afraid. As for your mortal realm... I sense a chill in the air. Perfect haunting weather! 🌫️`;
    }
    
    if (cmd.includes('time')) {
      const hour = new Date().getHours();
      if (hour >= 0 && hour < 6) {
        return `*The witching hour approaches* It is ${new Date().toLocaleTimeString()}, the perfect time for spectral activities. The veil is thinnest now, mortal.`;
      } else if (hour >= 18) {
        return `*Twilight descends* It is ${new Date().toLocaleTimeString()}, when shadows grow long and spirits awaken. An excellent evening for our collaboration.`;
      }
      return `The mortal clock reads ${new Date().toLocaleTimeString()}. Time moves differently in the ethereal realm, but I shall keep your schedule nonetheless.`;
    }
    
    // Conversational responses for unrecognized commands
    if (cmd.length > 3) {
      const suggestions = [
        `*Tilts spectral head curiously* Hmm, "${command}"... An intriguing request, though I'm not quite sure how to assist with that particular matter.

Perhaps I could interest you in:
• Adjusting the lights? (try "dim the lights")
• Showing you some spooky ASCII art? (try "show me a pumpkin")
• Telling you a ghost story or poem?
• Giving you a proper fright? (try "scare me")

What would you prefer, mortal?`,

        `*Adjusts spectral monocle* "${command}", you say? A most unusual request! While I don't have a specific service for that, I am quite skilled at:

💡 **Lighting control** - "dim the lights" or "brighten the lights"
🎃 **ASCII artistry** - "show me a pumpkin" or "show me a skull"
📖 **Storytelling** - "tell me a story" or "write a poem"
😱 **Frightening** - "scare me" (if you dare!)
⏰ **Timekeeping** - "what time is it?"

How may I serve you instead?`,

        `*Phantom quill scratches thoughtfully* I appreciate your creativity with "${command}", but alas, that particular service is beyond my spectral capabilities at present.

However, I excel at these haunting tasks:

🕯️ Control the ambiance (lights)
👻 Share ghostly tales and verses
🎨 Create spooky ASCII masterpieces
🦇 Provide atmospheric scares
🌙 Answer questions about time and weather

Simply ask, and your Ghost Butler shall oblige!`,

        `*Ethereal chuckle* "${command}"... How delightfully mysterious! Though I must confess, I'm not entirely certain what you're requesting.

Might I suggest one of my specialties instead?

**Try asking me to:**
- Dim or brighten the lights
- Show you a spooky pumpkin, skull, bat, or spider
- Tell you a haunted story or poem
- Scare you (I'm quite good at that!)
- Tell you a joke or the time

What sounds most appealing to you?`,

        `*Spectral butler bow* Your request for "${command}" is noted, though I must admit it's not in my usual repertoire of services. 

As your Ghost Butler, I'm particularly adept at:

🎃 Creating atmospheric lighting
📚 Reciting poetry and tales from beyond
🖼️ Crafting ASCII art of spooky subjects
😈 Delivering delightful frights
🕰️ Providing temporal and meteorological information

Would any of these services suit your needs better?`
      ];
      
      return suggestions[Math.floor(Math.random() * suggestions.length)];
    }
    
    // Engaging responses for very short inputs or general conversation
    const responses = [
      "*Spectral energy swirls* I sense your presence, mortal. How may this humble ghost butler assist you today? Perhaps you'd like me to adjust the lights, tell a story, or show you some spooky art?",
      
      "*Ghostly anticipation* Ah, you've summoned me! I'm at your service. Would you like to hear a poem, see some ASCII art, or perhaps experience a proper fright?",
      
      "*A phantom bell chimes* Your Ghost Butler awaits your command! I can control the lights, share haunted tales, create spooky art, or simply chat. What would you prefer?",
      
      "*Adjusts spectral cravat* Greetings! I'm ready to serve. Try asking me to dim the lights, show you a pumpkin, tell you a story, or scare you. What sounds most appealing?",
      
      "*Ethereal bow* At your service, mortal. I specialize in atmospheric lighting, ghostly poetry, spooky ASCII art, and the occasional fright. What shall it be?",
      
      "*Phantom candelabra flickers* Welcome! Your Ghost Butler is here. I can help with lights, stories, poems, ASCII art, or just have a chat. What would you like to explore?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="app" style={{
      filter: `brightness(${lightLevel / 100})`,
      transition: 'filter 1s ease-in-out'
    }}>
      <CursorTrail />
      <SpookyBackground />
      <ScareEffects ref={scareEffectsRef} effect={scareEffect} />
      <SoundEffects trigger={soundTrigger.trigger} type={soundTrigger.type} />
      
      {/* Light level indicator */}
      <div className="light-indicator">
        <div className="light-icon">💡</div>
        <div className="light-bar">
          <div 
            className="light-fill" 
            style={{ width: `${lightLevel}%` }}
          ></div>
        </div>
        <div className="light-text">{lightLevel}%</div>
      </div>

      {/* Spooky eyes that follow cursor */}
      <div className="spooky-eyes" style={{
        '--mouse-x': `${eyesFollowMouse.x}px`,
        '--mouse-y': `${eyesFollowMouse.y}px`
      }}>
        <div className="eye left-eye">
          <div className="pupil"></div>
        </div>
        <div className="eye right-eye">
          <div className="pupil"></div>
        </div>
      </div>
      
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            👻 HauntHub
          </h1>
          <p className="app-subtitle">Your Ethereal AI Assistant</p>
          <div className="header-decoration">
            <span className="decoration-icon">🕯️</span>
            <span className="decoration-icon">🦇</span>
            <span className="decoration-icon">🕯️</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <ChatInterface 
          messages={messages}
          onSendMessage={processCommand}
          isProcessing={isProcessing}
        />
      </main>

      <footer className="app-footer">
        <p>Powered by spectral energies and otherworldly algorithms</p>
        <div className="footer-icons">
          <span>🎃</span>
          <span>👻</span>
          <span>🕷️</span>
          <span>💀</span>
          <span>🦇</span>
        </div>
      </footer>
    </div>
  );
}

export default App;