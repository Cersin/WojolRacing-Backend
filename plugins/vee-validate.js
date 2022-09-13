import { configure, defineRule } from "vee-validate";
import {localize, setLocale} from "@vee-validate/i18n";
import AllRules from "@vee-validate/rules";
import pl from '@vee-validate/i18n/dist/locale/pl.json';

configure({
    validateOnInput: true,
    generateMessage: localize({
        pl,
    }),
});
Object.keys(AllRules).forEach(rule => {
    defineRule(rule, AllRules[rule]);
});
setLocale('pl');
