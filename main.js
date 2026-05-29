const TabChange=new Event("TabChange");
window.currentTab=0;
const tabBtns=document.getElementById("op-chooser").children;
const tabs=document.getElementById("ops").children;
function setTab(tab) {
    tabBtns[window.currentTab].classList.remove("active");
    tabBtns[tab].classList.add("active");
    window.currentTab=tab;
    dispatchEvent(TabChange);
}
for (let i=0;i<tabBtns.length;i++) {
    const btn=tabBtns[i];
    btn.addEventListener("click",()=>{
        setTab(i);
    });
}
window.addEventListener("TabChange",()=>{
    for (let i=0;i<tabs.length;i++) {
        const tab=tabs[i];
        if (i==window.currentTab) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    }
});
const prime=9973