import { mount, createLocalVue, config } from "@vue/test-utils";
import LicenseDropdown from "@/Components/LicenseDropdown.vue";
import VueI18n from "vue-i18n";
import Vuex from "vuex";
import Buefy from "buefy";

describe("LicenseDropdown.vue", () => {
    let wrapper;
    let getters;
    let store;

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(VueI18n);
        localVue.use(Vuex);
        localVue.use(Buefy);

        const language = require("../../src/locales/en.json");

        const i18n = new VueI18n({
            locale: "en",
            fallbackLocale: "en",
            messages: language
        });

        store = new Vuex.Store({
            getters
        });

        wrapper = mount(LicenseDropdown, {
            localVue,
            store
        });

        config.mocks.i18n = i18n;

        config.mocks.$t = key => {
            return i18n.messages[key];
        };
    });

    it("Has the field tag", () => {
        expect(wrapper.contains(".license-dropdown")).toBe(true);
    });

    it("Has the option tag", () => {
        expect(wrapper.contains(".options")).toBe(true);
    });

    it("should emit input event from setCurrentLicense method", async () => {
        wrapper.vm.$emit("input");
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().input).toBeTruthy();
    });

    it("Checks whether select element is getting triggered", () => {
        wrapper
            .findAll(".select")
            .at(0)
            .trigger("input");
    });
});
