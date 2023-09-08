import init, { Generator, Array16u8 } from "../pkg/loteria_motor.js";

function toArray(a: Array16u8) : Number[]{
    let array : Number[] = new Array();
    for(let i = 0; i < 16; ++i){
        array[i] = a.get(i);
    }

    return array;
}

export let boards : Number[][] = new Array();
export let cards : HTMLImageElement[] = new Array();
export let boards_image : HTMLImageElement[] = new Array();
const format_options: Intl.NumberFormatOptions = {
    minimumIntegerDigits: 3,
} as Intl.NumberFormatOptions ;

function fmtint(n: number) : string {
    return Intl.NumberFormat("en-US", format_options).format(n);
}

for(let i = 0; i < 54; ++i){
    let img = new Image();
    img.src = `images/out.1.image-${ fmtint(i) }.png`;
    cards.push(img);
}

let bs = document.getElementById('boards');

init().then(() => {
    let gen = new Generator(8, 0);
    let a = gen.next();
    while(a != null){
        boards.push(toArray(a));
        a = gen.next();
    }
    
    let width  = cards[0].width;
    let height = cards[0].height;

    if (bs == null) return; 
    for(const [i, b] of boards.entries()){
        let id = `canva_${fmtint(i)}`;
        bs.innerHTML += `<canvas id="${id}"></canvas>`;
        let canvas = document.getElementById(id) as HTMLCanvasElement;
        if(canvas == null) return;

        let height = cards[0].width;
        let width  = cards[1].width;
        canvas.width = width * 4;
        canvas.height = height * 4;

        let ctx = canvas.getContext("2d");
        if(ctx == null) return;
        for(let ij = 0; ij < 16; ++ij){
            let i = ij % 4;
            let j = ij / 4;

            let indx = b[ij] as number;
            ctx.drawImage(cards[indx], i * width , j * height);
        }
    }


    // canvas.width = width * 4;
    // canvas.height = height * 4;
    // let ctx = canvas.getContext("2d");
    // if(ctx == null){return;}
    // ctx.drawImage(cards[0], 0 * width, 0 * height);
    // ctx.drawImage(cards[1], 1 * width, 1 * height);
    // ctx.drawImage(cards[2], 2 * width, 2 * height);
    // ctx.drawImage(cards[3], 3 * width, 3 * height);
})
