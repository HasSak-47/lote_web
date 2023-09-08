import init, { Generator } from "../pkg/loteria_motor.js";
function toArray(a) {
    let array = new Array();
    for (let i = 0; i < 16; ++i) {
        array[i] = a.get(i);
    }
    return array;
}
export let boards = new Array();
export let cards = new Array();
export let boards_image = new Array();
const format_options = {
    minimumIntegerDigits: 3,
};
for (let i = 0; i < 54; ++i) {
    let img = new Image();
    img.src = `images/out.1.image-${Intl.NumberFormat("en-US", format_options).format(i)}.png`;
    cards.push(img);
}
let canvas = document.getElementById('image');
init().then(() => {
    let gen = new Generator(8, 0);
    let a = gen.next();
    while (a != null) {
        boards.push(toArray(a));
        a = gen.next();
    }
    let width = cards[0].width;
    let height = cards[0].height;
    if (canvas == null) {
        return;
    }
    canvas.width = width * 4;
    canvas.height = height * 4;
    let ctx = canvas.getContext("2d");
    if (ctx == null) {
        return;
    }
    ctx.drawImage(cards[0], 0 * width, 0 * height);
    ctx.drawImage(cards[1], 1 * width, 1 * height);
    ctx.drawImage(cards[2], 2 * width, 2 * height);
    ctx.drawImage(cards[3], 3 * width, 3 * height);
});
