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
const ROPE_SPEED = 1080 / 0.5;
const ROPE_RETRIEVE_SPEED = 1080 / 1;
// Max square distance between the rope and the llama.
// If smaller than this threshold, the llama is considered caught.
const LLAMA_CAUGHT_THRESHOLD = 128 * 128;
// Delay seconds when llama is caught until the next movement.
const LLAMA_CAUGHT_DELAY = 2;