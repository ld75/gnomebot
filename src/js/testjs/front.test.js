import {FrontDisplayer} from "../front/FrontDisplayer.js"
import {AddGnomePannel} from "../front/webcomponents/AddGnomePannel.js";

it('display_add_gnome', function () {
    FrontDisplayer.displayAddGnome()

});
it("test webcomponent1",function(){
    let test = new AddGnomePannel();

})
it('test webcomponent2', function () {
    document.body.innerHTML = `<h1>gnomebot-addgnome</h1> <gnomebot-addgnome></gnomebot-addgnome>`
    expect(document.body.innerHTML).toContain('radio')
});

