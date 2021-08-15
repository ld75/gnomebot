import {FrontDisplayer} from "../front/FrontDisplayer.js"
import {Addgnomepannel} from "../front/webcomponents/addgnomepannel.js";

it('display_add_gnome', function () {
    FrontDisplayer.displayAddGnome()

});
it("test webcomponent1",function(){
    let test = new Addgnomepannel();

})
it('test webcomponent2', function () {
    document.body.innerHTML = `<h1>add-gnome</h1> <add-gnome></add-gnome>`
    expect(document.body.innerHTML).toContain('radio')
});

