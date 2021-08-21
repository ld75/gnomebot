import {FrontDisplayer} from "../front/FrontDisplayer.js"
import {AddGnomePannel} from "../front/webcomponents/addgnomepannel.js";
//TODO: pour l'instant les TU des webcomponents ne marchent pas. A resoudre.
it('display_add_gnome', function () {
    FrontDisplayer.displayAddGnome()

});
it("test webcomponent1",function(){
    let test = new AddGnomePannel();

})
it('test webcomponent2', function () {
    document.body.innerHTML = `<h1>add-gnome</h1> <add-gnome></add-gnome>`
    expect(document.body.innerHTML).toContain('radio')
});

