export interface Sprites {
	readonly "badge-plus": "/sprite-sheet.svg#badge-plus";
	readonly check: "/sprite-sheet.svg#check";
	readonly "circle-chevron": "/sprite-sheet.svg#circle-chevron";
	readonly discord: "/sprite-sheet.svg#discord";
	readonly "ellipsis-vertical": "/sprite-sheet.svg#ellipsis-vertical";
	readonly "eye-off": "/sprite-sheet.svg#eye-off";
	readonly eye: "/sprite-sheet.svg#eye";
	readonly "folder-plus": "/sprite-sheet.svg#folder-plus";
	readonly google: "/sprite-sheet.svg#google";
	readonly "grip-vertical": "/sprite-sheet.svg#grip-vertical";
	readonly group: "/sprite-sheet.svg#group";
	readonly house: "/sprite-sheet.svg#house";
	readonly "lock-keyhole": "/sprite-sheet.svg#lock-keyhole";
	readonly mail: "/sprite-sheet.svg#mail";
	readonly menu: "/sprite-sheet.svg#menu";
	readonly minus: "/sprite-sheet.svg#minus";
	readonly "mouse-pointer-2": "/sprite-sheet.svg#mouse-pointer-2";
	readonly "pencil-off": "/sprite-sheet.svg#pencil-off";
	readonly pencil: "/sprite-sheet.svg#pencil";
	readonly pin: "/sprite-sheet.svg#pin";
	readonly plus: "/sprite-sheet.svg#plus";
	readonly settings: "/sprite-sheet.svg#settings";
	readonly "shield-alert": "/sprite-sheet.svg#shield-alert";
	readonly "square-x": "/sprite-sheet.svg#square-x";
	readonly "tally-5": "/sprite-sheet.svg#tally-5";
	readonly "trash-2": "/sprite-sheet.svg#trash-2";
	readonly "user-round-pen": "/sprite-sheet.svg#user-round-pen";
}

export type SpriteKey = keyof Sprites;

export const spriteKeys: Sprites = {
	"badge-plus": "/sprite-sheet.svg#badge-plus",
	check: "/sprite-sheet.svg#check",
	"circle-chevron": "/sprite-sheet.svg#circle-chevron",
	discord: "/sprite-sheet.svg#discord",
	"ellipsis-vertical": "/sprite-sheet.svg#ellipsis-vertical",
	"eye-off": "/sprite-sheet.svg#eye-off",
	eye: "/sprite-sheet.svg#eye",
	"folder-plus": "/sprite-sheet.svg#folder-plus",
	google: "/sprite-sheet.svg#google",
	"grip-vertical": "/sprite-sheet.svg#grip-vertical",
	group: "/sprite-sheet.svg#group",
	house: "/sprite-sheet.svg#house",
	"lock-keyhole": "/sprite-sheet.svg#lock-keyhole",
	mail: "/sprite-sheet.svg#mail",
	menu: "/sprite-sheet.svg#menu",
	minus: "/sprite-sheet.svg#minus",
	"mouse-pointer-2": "/sprite-sheet.svg#mouse-pointer-2",
	"pencil-off": "/sprite-sheet.svg#pencil-off",
	pencil: "/sprite-sheet.svg#pencil",
	pin: "/sprite-sheet.svg#pin",
	plus: "/sprite-sheet.svg#plus",
	settings: "/sprite-sheet.svg#settings",
	"shield-alert": "/sprite-sheet.svg#shield-alert",
	"square-x": "/sprite-sheet.svg#square-x",
	"tally-5": "/sprite-sheet.svg#tally-5",
	"trash-2": "/sprite-sheet.svg#trash-2",
	"user-round-pen": "/sprite-sheet.svg#user-round-pen"
} as const;
