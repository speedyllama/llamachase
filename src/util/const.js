/* configurations */
const LANG = 'en_us';

/* constants */
const I18N_PATH = 'res/i18n.txt';
// Rope throw should begin at the bottom of the screen.
const ROPE_BEGIN_POS_THRESHOLD = 0.25;
// Time wait before retrieving the rope
const ROPE_WAIT = 0.5;
// The percentage of length of the rope to the length of the screen.
// Once the rope length reaches the following threshold, it is considered full length.
// This is to determine the rope speed.
const ROPE_MAX_PERCENTAGE = 0.5;
// Max speedy of the rope throw
const ROPE_MAX_SPEED = 1 / 0.2;
// Rope retrieve time factor. Rope retrieving is slower than throwing.
const ROPE_RETRIVE_FACTOR = 2;