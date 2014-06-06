loadAPI(1);
host.defineController("MidiMan", "MIDI Sport", "1.0", "95754470-c748-11e3-9c1a-0800200c9a66");
host.defineMidiPorts(1, 1);
host.addDeviceNameBasedDiscoveryPair(["MidiSport 2x2"], ["MidiSport 2x2"]);
host.addDeviceNameBasedDiscoveryPair(["MidiSport 2x2 MIDI 1"], ["MidiSport 2x2 MIDI 1"]);
// host.addDeviceNameBasedDiscoveryPair(["MidiSport 2x2 MIDI 2"], ["MidiSport 2x2 MIDI 2"]);

var LOWEST_CC = 2;
var HIGHEST_CC = 119;

function init()
{
   host.getMidiInPort(0).createNoteInput("MidiSport 2x2");
   host.getMidiInPort(0).setMidiCallback(onMidi);
   host.getMidiOutPort(0).setMidiCallback(sendMidi);

   userControls = host.createUserControlsSection(HIGHEST_CC - LOWEST_CC + 1);

   for(var i=LOWEST_CC; i<=HIGHEST_CC; i++)
      {
         userControls.getControl(i - LOWEST_CC).setLabel("CC" + i);
      }
}

function exit()
{
}

function onMidi(status, data1, data2)
{
   if (isChannelController(status))
   {
      if (data1 >= LOWEST_CC && data1 <= HIGHEST_CC)
      {
         var index = data1 - LOWEST_CC;
         userControls.getControl(index).set(data2, 128);
      }
   }
}

function sendMidi(status, data1, data2)
{
   if (isChannelController(status))
   {
      if (data1 >= LOWEST_CC && data1 <= HIGHEST_CC)
      {
         var index = data1 - LOWEST_CC;
         userControls.getControl(index).set(data2, 128);
      }
   }
}
