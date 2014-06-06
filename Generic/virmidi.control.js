loadAPI(1);

host.defineController("ALSA", "Virtual MIDI", "1.0", "6784c470-d150-11e3-9c1a-0800200c9a66");
host.defineMidiPorts(1, 1);
host.addDeviceNameBasedDiscoveryPair(["Virtual Raw MIDI 1-0"], ["Virtual Raw MIDI 1-0"]);
host.addDeviceNameBasedDiscoveryPair(["VirMIDI 1-0"], ["VirMIDI 1-0"]);

var LOWEST_CC = 1;
var HIGHEST_CC = 119;

function init()
{
	 Virmidi   = host.getMidiInPort(0).createNoteInput("Virmidi - Omni", "??????");
   Virmidi1  = host.getMidiInPort(0).createNoteInput("Virmidi - Channel 1", "?0????");
   Virmidi2  = host.getMidiInPort(0).createNoteInput("Virmidi - Channel 2", "?1????");
   Virmidi3  = host.getMidiInPort(0).createNoteInput("Virmidi - Channel 3", "?2????");
   Virmidi4  = host.getMidiInPort(0).createNoteInput("Virmidi - Channel 4", "?3????");
   Virmidi5  = host.getMidiInPort(0).createNoteInput("Virmidi - Channel 5", "?4????");
   Virmidi6  = host.getMidiInPort(0).createNoteInput("Virmidi - Channel 6", "?5????");
   Virmidi7  = host.getMidiInPort(0).createNoteInput("Virmidi - Channel 7", "?6????");
   Virmidi8  = host.getMidiInPort(0).createNoteInput("Virmidi - Channel 8", "?7????");
   Virmidi9  = host.getMidiInPort(0).createNoteInput("Virmidi - Channel 9", "?8????");
   Virmidi10 = host.getMidiInPort(0).createNoteInput("Virmidi - Channel 10", "?9????");
   Virmidi11 = host.getMidiInPort(0).createNoteInput("Virmidi - Channel 11", "?A????");
   Virmidi12 = host.getMidiInPort(0).createNoteInput("Virmidi - Channel 12", "?B????");
   Virmidi13 = host.getMidiInPort(0).createNoteInput("Virmidi - Channel 13", "?C????");
   Virmidi14 = host.getMidiInPort(0).createNoteInput("Virmidi - Channel 14", "?D????");
   Virmidi15 = host.getMidiInPort(0).createNoteInput("Virmidi - Channel 15", "?E????");
   Virmidi16 = host.getMidiInPort(0).createNoteInput("Virmidi - Channel 16", "?F????");
	 
	 Virmidi.setShouldConsumeEvents(false);
	 Virmidi1.setShouldConsumeEvents(false);
	 Virmidi2.setShouldConsumeEvents(false);
   Virmidi3.setShouldConsumeEvents(false);
   Virmidi4.setShouldConsumeEvents(false);
   Virmidi5.setShouldConsumeEvents(false);
   Virmidi6.setShouldConsumeEvents(false);
   Virmidi7.setShouldConsumeEvents(false);
   Virmidi8.setShouldConsumeEvents(false);
   Virmidi9.setShouldConsumeEvents(false);
   Virmidi10.setShouldConsumeEvents(false);
   Virmidi11.setShouldConsumeEvents(false);
   Virmidi12.setShouldConsumeEvents(false);
   Virmidi13.setShouldConsumeEvents(false);
   Virmidi14.setShouldConsumeEvents(false);
   Virmidi15.setShouldConsumeEvents(false);
   Virmidi16.setShouldConsumeEvents(false);
	 
// Virmidi.assignPolyphonicAftertouchToExpression(0,   NoteExpression.TIMBRE_UP, 5);	 
// Virmidi1.assignPolyphonicAftertouchToExpression(0,   NoteExpression.TIMBRE_UP, 5);
// Virmidi2.assignPolyphonicAftertouchToExpression(1,   NoteExpression.TIMBRE_UP, 5);
//   Virmidi3.assignPolyphonicAftertouchToExpression(2,   NoteExpression.TIMBRE_UP, 5);
//   Virmidi4.assignPolyphonicAftertouchToExpression(3,   NoteExpression.TIMBRE_UP, 5);
//   Virmidi5.assignPolyphonicAftertouchToExpression(4,   NoteExpression.TIMBRE_UP, 5);
//   Virmidi6.assignPolyphonicAftertouchToExpression(5,   NoteExpression.TIMBRE_UP, 5);
//   Virmidi7.assignPolyphonicAftertouchToExpression(6,   NoteExpression.TIMBRE_UP, 5);
//   Virmidi8.assignPolyphonicAftertouchToExpression(7,   NoteExpression.TIMBRE_UP, 5);
//   Virmidi9.assignPolyphonicAftertouchToExpression(8,   NoteExpression.TIMBRE_UP, 5);
//   Virmidi10.assignPolyphonicAftertouchToExpression(9,  NoteExpression.TIMBRE_UP, 5);
//   Virmidi11.assignPolyphonicAftertouchToExpression(10, NoteExpression.TIMBRE_UP, 5);
//   Virmidi12.assignPolyphonicAftertouchToExpression(11, NoteExpression.TIMBRE_UP, 5);
//   Virmidi13.assignPolyphonicAftertouchToExpression(12, NoteExpression.TIMBRE_UP, 5);
//   Virmidi14.assignPolyphonicAftertouchToExpression(13, NoteExpression.TIMBRE_UP, 5);
//   Virmidi15.assignPolyphonicAftertouchToExpression(14, NoteExpression.TIMBRE_UP, 5);
//   Virmidi16.assignPolyphonicAftertouchToExpression(15, NoteExpression.TIMBRE_UP, 5);

	 host.getMidiOutPort(0).setShouldSendMidiBeatClock;
   host.getMidiInPort(0).setMidiCallback(onMidi);
	 host.getMidiInPort(0).setSysexCallback(onSysex);

   // Make CCs 2-119 freely mappable
   userControls = host.createUserControlsSection(HIGHEST_CC - LOWEST_CC + 1);

   for(var i=LOWEST_CC; i<=HIGHEST_CC; i++)
   {
      userControls.getControl(i - LOWEST_CC).setLabel("CC" + i);
   }
	 //AKAI.assignPolyphonicAftertouchToExpression(0, NoteExpression.TIMBRE_UP, 5);

	 
}

function exit()
{
}

function onMidi(status, data1, data2)
{
	 //printMidi(status, data1, data2);

   if (isChannelController(status))
   {
      if (data1 >= LOWEST_CC && data1 <= HIGHEST_CC)
      {
         var index = data1 - LOWEST_CC;
         userControls.getControl(index).set(data2, 128);
      }
   }
}

function onSysex(data)
{
	printSysex(data);
}
