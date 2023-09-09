import init, { Generator, Array16u8 } from "../pkg/loteria_motor.js";


function toArray(a: Array16u8) : number[]{
    let array : number[] = new Array();
    for(let i = 0; i < 16; ++i){
        array[i] = a.get(i);
    }

    return array;
}

export let boards : number[][] = new Array();
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
    img.src = `images/out.1.image-${fmtint(i)}.png`;
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
    for(const [id, b] of boards.entries()){
        let id_str = `canva_${fmtint(id)}`;
        let canvas = document.createElement("canvas");
        canvas.id = id_str;
        canvas.className = 'loteria';

        canvas.width = width * 4;
        canvas.height = height * 4;

        let ctx = canvas.getContext("2d");
        if(ctx == null) return;
        ctx.drawImage(cards[0], 0, 0)//i * width , j * height);
        bs.appendChild(canvas);
        for(let ij = 0; ij < 16; ++ij){
            let i = ij % 4;
            let j = Math.floor(ij / 4);

            ctx.drawImage(cards[b[ij]], i * width, j * height);
        }
        let data_url = canvas.toDataURL('image/png');
        let download_link = document.createElement('a');
        let url = data_url.replace(/^data:image\/png/,'data:application/octet-stream');
        download_link.setAttribute('href', url);
        download_link.setAttribute('download', `loteria_${id}.png`);
        download_link.click();
    }
})
