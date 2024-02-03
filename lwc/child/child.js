import { LightningElement, api } from 'lwc';

export default class Child extends LightningElement {
    @api
    valuefromparent;

    get count(){
        return this.valuefromparent.length;
    }

    value = [];

    get options() {
        return [
            { label: 'Dileep', value: 'Dileep' },
            { label: 'Jugal', value: 'Jugal' },
            { label: 'Krishan', value: 'Krishan' },
            { label: 'Ram', value: 'Ram' },
        ];
    }

    get selectedValues() {
        return this.value.join(',');
    }



    //textFromCheckBox;
    @api
    gettingDataFromParent(text){
        this.value = text.split(',');
    }
    selectedValues;
    handleChange(e){
        this.selectedValues = e.detail.value.join(',');
        const cusTomEvent = new CustomEvent('selectedvalues', {detail:this.selectedValues});
        this.dispatchEvent(cusTomEvent);
    }
}