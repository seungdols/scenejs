import { IObject } from "@daybrush/utils";
import { RoleObject, OptionType, EventType } from "./types";

export const PREFIX = "__SCENEJS_";
export const DATA_SCENE_ID = "data-scene-id";
export const TIMING_FUNCTION = "animation-timing-function";
export const ROLES: RoleObject = { transform: {}, filter: {}, attribute: {} };
export const ALIAS: IObject<string[]> = { easing: [TIMING_FUNCTION] };
export const FIXED = { [TIMING_FUNCTION]: true, contents: true };
export const MAXIMUM = 1000000;
export const THRESHOLD = 0.000001;

export const DURATION = "duration";
export const FILL_MODE = "fillMode";
export const DIRECTION = "direction";
export const ITERATION_COUNT = "iterationCount";
export const DELAY = "delay";
export const EASING = "easing";
export const PLAY_SPEED = "playSpeed";
export const EASING_NAME = "easingName";
export const ITERATION_TIME = "iterationTime";
export const PAUSED = "paused";
export const ENDED = "ended";
export const TIMEUPDATE = "timeupdate";
export const ANIMATE = "animate";
export const PLAY = "play";
export const RUNNING = "running";
export const ITERATION = "iteration";
export const START_ANIMATION = "startAnimation";
export const PAUSE_ANIMATION = "pauseAnimation";
export const ALTERNATE = "alternate";
export const REVERSE = "reverse";
export const ALTERNATE_REVERSE = "alternate-reverse";
export const NORMAL = "normal";
export const INFINITE = "infinite";
export const PLAY_STATE = "playState";
export const PLAY_CSS = "playCSS";
export const PREV_TIME = "prevTime";
export const TICK_TIME = "tickTime";
export const CURRENT_TIME = "currentTime";
export const SELECTOR = "selector";
export const TRANSFORM_NAME = "transform";

/**
* option name list
* @name Scene.OPTIONS
* @memberof Scene
* @static
* @type {$ts:OptionType}
* @example
* Scene.OPTIONS // ["duration", "fillMode", "direction", "iterationCount", "delay", "easing", "playSpeed"]
*/
export const OPTIONS: OptionType = [DURATION, FILL_MODE, DIRECTION, ITERATION_COUNT, DELAY, EASING, PLAY_SPEED];

/**
* Event name list
* @name Scene.EVENTS
* @memberof Scene
* @static
* @type {$ts:EventType}
* @example
* Scene.EVENTS // ["paused", "ended", "timeupdate", "animate", "play", "iteration"];
*/
export const EVENTS: EventType = [PAUSED, ENDED, TIMEUPDATE, ANIMATE, PLAY, ITERATION];
