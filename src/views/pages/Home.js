import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home");
    }

    async render() {
        return `
            <main class="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
            
                <!-- Language Dropdown -->
                <div class="absolute top-3 right-3 w-32 z-10">
                    <button id="dropdownButton" class="flex justify-between items-center bg-gray-200 px-4 py-2 rounded-md">
                        <span class="text-gray-800">Language</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             class="h-5 w-5 ml-1 text-gray-800">
                            <path d="M12 5v14"></path>
                            <path d="m19 12-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div id="dropdown" class="hidden mt-2 bg-white rounded-md shadow-lg overflow-hidden">
                        <div><a class="block px-4 py-2 text-gray-800" href="#">English</a></div>
                        <div><a class="block px-4 py-2 text-gray-800" href="#">Korean</a></div>
                        <div><a class="block px-4 py-2 text-gray-800" href="#">Chinese</a></div>
                    </div>
                </div>
                
                <!-- Game Mode Selection -->
                <div>
                    <div class="w-full flex justify-center items-center p-4">
                        <h1 class="text-4xl font-bold">Choose Your Pong Game Mode</h1>
                    </div>
                    <div class="flex flex-row gap-8 mt-8">
                        <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-48" data-v0-t="card">
                            <div class="flex flex-col items-center justify-center p-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                     class="h-12 w-12 mb-4">
                                    <line x1="6" x2="10" y1="12" y2="12"></line>
                                    <line x1="8" x2="8" y1="10" y2="14"></line>
                                    <line x1="15" x2="15.01" y1="13" y2="13"></line>
                                    <line x1="18" x2="18.01" y1="11" y2="11"></line>
                                    <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                                </svg>
                                <h3 class="tracking-tight text-2xl font-bold mb-2">1 VS 1</h3>
                                <p class="text-sm text-muted-foreground text-center">Play 1 vs 1 game of Pong</p>
                                <button class="mt-4 inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-800/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50" onclick="openModal('modelConfirm')">
                                    Play
                                </button>
                            </div>
                        </div>
                        <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-48" data-v0-t="card">
                            <div class="flex flex-col items-center justify-center p-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                     class="h-12 w-12 mb-4">
                                    <line x1="6" x2="10" y1="12" y2="12"></line>
                                    <line x1="8" x2="8" y1="10" y2="14"></line>
                                    <line x1="15" x2="15.01" y1="13" y2="13"></line>
                                    <line x1="18" x2="18.01" y1="11" y2="11"></line>
                                    <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                                </svg>
                                <h3 class="tracking-tight text-2xl font-bold mb-2">2 VS 2</h3>
                                <p class="text-sm text-muted-foreground text-center">Play 2 vs 2 game of Pong</p>
                                <button class="mt-4 inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-800/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50" onclick="openModal('modelConfirm')">
                                    Play
                                </button>
                            </div>
                        </div>
                        <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-48" data-v0-t="card">
                            <div class="flex flex-col items-center justify-center p-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                     class="h-12 w-12 mb-4">
                                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                                    <path d="M4 22h16"></path>
                                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                                </svg>
                                <h3 class="tracking-tight text-2xl font-bold mb-2">Tournament</h3>
                                <p class="text-sm text-muted-foreground text-center">Compete in a Pong tournament</p>
                                <button class="mt-4 inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-800/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50" onclick="openModal('modelConfirm')">
                                    Play
                                </button>
                            </div>
                        </div>
                        <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-48" data-v0-t="card">
                            <div class="flex flex-col items-center justify-center p-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                     class="h-12 w-12 mb-4">
                                    <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"></path>
                                    <path d="m13 12-3 5h4l-3 5"></path>
                                </svg>
                                <h3 class="tracking-tight text-2xl font-bold mb-2">AI</h3>
                                <p class="text-sm text-muted-foreground text-center">Human vs AI Please beat the Machine!</p>
                                <button class="mt-4 inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-800/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50" onclick="openModal('modelConfirm')">
                                    Play
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Game Customization Modal -->
                <div id="modelConfirm" class="fixed hidden inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div class="relative bg-white rounded-lg px-10 py-14 max-w-md mx-auto">
                        <button onclick="closeModal('modelConfirm')" class="absolute top-0 right-0 mt-6 mr-6 text-gray-700 hover:text-gray-500">
                            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <div class="text-3xl font-bold mb-6">Game Customization</div>
                        <div>
                            <div class="mb-6">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="nickname">
                                    Nickname
                                </label>
                                <input
                                        class="flex h-10 border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="nickname"
                                />
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="speed-up">
                                    Speed Up
                                </label>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input id="speed-up" type="checkbox" value="" class="sr-only peer">
                                    <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div class="mb-7">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="fancy-ball">
                                    Fancy Ball
                                </label>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input id="fancy-ball" type="checkbox" value="" class="sr-only peer">
                                    <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <button onclick="closeModal('modelConfirm')"
                                    class="ring-offset-background focus-visible:ring-offset-2 h-10 inline-flex items-center justify-center rounded-md bg-gray-400 px-7 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-600 disabled:pointer-events-none disabled:opacity-50">
                                Cancel
                            </button>
                            <a data-link href="/game"
                                    onclick="closeModal('modelConfirm')"
                                    class="ring-offset-background focus-visible:ring-offset-2 h-10 inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-800/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50">
                                Start Game
                            </a>
                        </div>
                    </div>
                </div>
                
            </main>
        `;
    }

    async after_render() {

        // Open modal
        window.openModal = function (modalId) {
            document.getElementById(modalId).style.display = 'flex'
            document.getElementsByTagName('body')[0].classList.add('overflow-y-hidden');
        }

        // Close modal
        window.closeModal = function (modalId) {
            document.getElementById(modalId).style.display = 'none'
            document.getElementsByTagName('body')[0].classList.remove('overflow-y-hidden');
            clearModal(modalId);
        }

        // Clear modal input data when close
        const clearModal = function (modalId) {
            document.getElementById('nickname').value = '';
            document.getElementById('speed-up').checked = false;
            document.getElementById('fancy-ball').checked = false;
        }

        // Close all modals when press ESC
        document.onkeydown = function (event) {
            event = event || window.event;
            if (event.keyCode === 27) {
                closeModal('modelConfirm');
            }
        };

        // Language dropdown
        document.getElementById('dropdownButton').addEventListener('click', function() {
            document.getElementById('dropdown').classList.toggle('hidden');
        });
    }
}