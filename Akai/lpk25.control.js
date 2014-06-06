loadAPI(1);
host.defineController("Akai", "LPK25", "1.0", "6ee2e190-b9a2-11e3-a5e2-0800200c9a66");
host.defineMidiPorts(1, 1);
host.addDeviceNameBasedDiscoveryPair(["LPK25 MIDI 1"], ["LPK25 MIDI 1"]);
host.addDeviceNameBasedDiscoveryPair(["LPK25"], ["LPK25"]);

var LOWEST_CC = 2;
var HIGHEST_CC = 119;

function init()
{
   host.getMidiInPort(0).createNoteInput("LPK25");
//   host.getMidiOutPort(0).createNoteOutput("LPK25");
   host.getMidiInPort(0).setMidiCallback(onMidi);
//   host.getMidiOutPort(0).setMidiCallback(onMidi);

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
