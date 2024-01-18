import store from "../../../store/index.js";
import Component from "../../../library/component.js";

export default class InvalidNicknameModal extends Component {
    constructor(params) {
        super({
            store,
            element: document.getElementById("invalid-nickname-modal"),
        });
        this.renderSkeleton();
        this.handleEvent();
    }

    async renderSkeleton() {
        const view = `
            <div class="modal fade" id="statusErrorsModal" tabindex="-1" role="dialog" data-bs-backdrop="static"
                 data-bs-keyboard="false">
                <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                    <div class="modal-content">
                        <div class="modal-body text-center p-lg-4">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                                <circle class="path circle" fill="none" stroke="#db3646" stroke-width="6"
                                        stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                                <line class="path line" fill="none" stroke="#db3646" stroke-width="6"
                                      stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8"
                                      y2="92.3"/>
                                <line class="path line" fill="none" stroke="#db3646" stroke-width="6"
                                      stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" X2="34.4"
                                      y2="92.2"/>
                            </svg>
                            <h4 class="text-danger mt-3">Network Error</h4>
                            <p class="mt-3">One player left the game</p>
                            <button type="button" class="btn btn-sm mt-3 btn-danger" data-bs-dismiss="modal">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
		`;

        this.element.innerHTML = view;
    }

    async handleEvent() {
    }
}
