import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Game");
    }

    async render() {
        return `
            <div class="bg-black min-h-screen flex flex-col items-center justify-center">
                <div class="flex flex-row justify-between w-full max-w-4xl">
                    <div class="text-white text-4xl font-bold mb-8 ml-5">minseok2</div>
                    <div class="text-white text-4xl font-bold mb-8 mr-5">dahkang</div>
                </div>
                <div class="text-white text-4xl font-bold mb-8"><span>4</span><span class="mx-4">:</span><span>2</span></div>
                <div class="relative w-full max-w-4xl h-[500px]">
                    <div class="absolute top-0 left-0 h-full border-l-2 border-white flex items-center">
                        <div class="bg-white w-2 h-24"></div>
                    </div>
                    <div class="absolute top-0 right-0 h-full border-r-2 border-white flex items-center">
                        <div class="bg-white w-2 h-24"></div>
                    </div>
                    <div class="absolute inset-0 m-auto h-16 w-16 text-9xl text-white flex items-center justify-center">
                        PONG
                    </div>
                    <div class="absolute inset-0 flex justify-center items-center">
                        <div class="w-px h-full bg-white bg-dotted"></div>
                    </div>
                    <div class="absolute top-1/2 right-1/2 mr-12 w-4 h-4 bg-white rounded-full transform -translate-y-1/2"></div>
                </div>
            </div>
        `;
    }
}