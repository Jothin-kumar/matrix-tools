class Clone {
    constructor(elem) {
        this.elem=elem;
        this.clone=document.createElement("span");
        this.clone.classList.add("clone");
        this.clone.style.position="absolute";
        this.clone.style.pointerEvents="none";
        this.clone.style.zIndex=1000;
        this.clone.style.display=window.currentTab==0?"flex":"none";
        this.clone.style.alignItems="center";
        this.clone.style.justifyContent="center";
        this.clone.innerText=elem.value;
        this.update();
        document.body.appendChild(this.clone);
        // window.addEventListener("resize",()=>{
        //     setTimeout(()=>this.update,100)
        // });
        this.clone.style.backgroundColor="rgba(18, 46, 15, 1)"
        this.clone.style.borderRadius="10px"
        window.addEventListener("TabChange",()=>{
            this.clone.style.display=window.currentTab==0?"flex":"none";
        })
    }
    update(){
        const bcr=this.elem.getBoundingClientRect();
        this.clone.style.width=bcr.width+"px";
        this.clone.style.height=bcr.height+"px";
        this.clone.style.left=bcr.left+"px";
        this.clone.style.top=bcr.top+"px";
        this.clone.style.font=window.getComputedStyle(this.elem).font;
        this.clone.style.fontSize=window.getComputedStyle(this.elem).fontSize;
        this.timeout=setTimeout(()=>this.update(),100);
    }
    kill(){
        document.body.removeChild(this.clone);
        clearTimeout(this.timeout);
        this.timeout=null;
    }
}
function mergeClones(c1,c2) {
    const f=()=>{
        let mid=(c1.elem.parentElement.parentElement.getBoundingClientRect().right+c2.elem.parentElement.parentElement.getBoundingClientRect().left)/2;
        mid-=(c1.clone.getBoundingClientRect().width/2);
        c1.clone.style.marginLeft=(parseInt(c1.clone.style.marginLeft || 0)-(c1.clone.getBoundingClientRect().left-mid))+"px";
        c2.clone.style.marginLeft=(parseInt(c2.clone.style.marginLeft || 0)+(mid-c2.clone.getBoundingClientRect().left))+"px";
        if (c1.timeout || c2.timeout) {
            setTimeout(f,100);
        }
    }
    f();
}

function compute_mul(){
    const m=parseInt(document.getElementById("mat-mul-in1").value);
    const n=parseInt(document.getElementById("mat-mul-in2").value);
    const p=parseInt(document.getElementById("mat-mul-in3").value);
    for (let i=0;i<m;i++){
        for (let j=0;j<p;j++){
            let lol=0;
            for (let k=0;k<n;k++){
                lol+=(mul_matA.get(i,k)*mul_matB.get(k,j))%prime
                lol%=prime
            }
            mul_matRes.set(i,j,lol);
        }
    }
}
function mul_matrices(){
    const m=parseInt(document.getElementById("mat-mul-in1").value);
    const n=parseInt(document.getElementById("mat-mul-in2").value);
    const p=parseInt(document.getElementById("mat-mul-in3").value);
    if (window.mul_matA){
        window.mul_matA.revokeParent(document.getElementById("mul-mat-a"));
        window.mul_matB.revokeParent(document.getElementById("mul-mat-b"));
        window.mul_matRes.revokeParent(document.getElementById("mul-mat-res"));
    }
    window.mul_matA=new Matrix(m,n,true,compute_mul);
    mul_matA.useParent(document.getElementById("mul-mat-a"));
    window.mul_matB=new Matrix(n,p,true,compute_mul);
    mul_matB.useParent(document.getElementById("mul-mat-b"));
    window.mul_matRes=new Matrix(m,p);
    mul_matRes.useParent(document.getElementById("mul-mat-res"));
    let c=1;
    for (let i=0;i<m;i++) {
        for (let j=0;j<n;j++) {
            mul_matA.set(i,j,c++);
        }
    }
    for (let i=0;i<n;i++) {
        for (let j=0;j<p;j++) {
            mul_matB.set(i,j,c++);
        }
    }
    compute_mul();
}
["mat-mul-in1","mat-mul-in2","mat-mul-in3"].forEach(id=>{
    document.getElementById(id).addEventListener("change",mul_matrices);
});
mul_matrices();

document.getElementById("mat-mul-animate").addEventListener("click",async ()=>{
    ["mat-mul-in1","mat-mul-in2","mat-mul-in3","mat-mul-animate"].forEach(id=>document.getElementById(id).disabled=true);
    document.querySelectorAll(".mat-mul-syms").forEach(e=>e.style.opacity=0);
    const m=parseInt(document.getElementById("mat-mul-in1").value);
    const n=parseInt(document.getElementById("mat-mul-in2").value);
    const p=parseInt(document.getElementById("mat-mul-in3").value);
    await new Promise(r=>setTimeout(r,800));
    for (let i=0;i<m;i++){
        for (let j=0;j<p;j++){
            mul_matRes.set(i,j,"");
        }
    }
    await new Promise(r=>setTimeout(r,800));
    await mul_matA.transpose()
    await new Promise(r=>setTimeout(r,800));

    for (let i=0;i<m;i++){
        for (let j=0;j<p;j++){
            let lol=0;
            mul_matRes.highlight(i,j);
            await new Promise(r=>setTimeout(r,1000));
            const Avals=[]
            const Bvals=[]
            for (let k=0;k<n;k++){
                mul_matA.highlight(i,k);
                mul_matB.highlight(k,j);
                Avals.push(new Clone(mul_matA.e.children[i].children[k]));
                Bvals.push(new Clone(mul_matB.e.children[k].children[j]));
                lol+=(mul_matA.get(i,k)*mul_matB.get(k,j))%prime
                lol%=prime
            }
            await new Promise(r=>setTimeout(r,2000));
            for (let k=0;k<n;k++){
                mergeClones(Avals[k],Bvals[k]);
            }
            await new Promise(r=>setTimeout(r,1000));
            for (let k=0;k<n;k++){
                const h=(mul_matA.get(i,k)*mul_matB.get(k,j))%prime;
                Avals[k].clone.innerText=h;
                Bvals[k].clone.innerText=h;
                Avals[k].clone.style.color="orange";
                Bvals[k].clone.style.color="orange";
                setTimeout(()=>Avals[k].clone.style.color="white",2000);
                setTimeout(()=>Bvals[k].clone.style.color="white",2000);
            }
            await new Promise(r=>setTimeout(r,3500));
            for (let k=0;k<n;k++){
                mul_matA.unhighlight(i,k);
                mul_matB.unhighlight(k,j);
            }
            await new Promise(r=>setTimeout(r,2000));
            mul_matRes.set(i,j,lol);
            mul_matRes.unhighlight(i,j);
            await new Promise(r=>setTimeout(r,3000));
            Avals.forEach(c=>c.clone.style.opacity=0);
            Bvals.forEach(c=>c.clone.style.opacity=0);
            setTimeout(()=>{
                Avals.forEach(c=>c.kill());
            Bvals.forEach(c=>c.kill());
            },500)
            await new Promise(r=>setTimeout(r,800));
        }
    }

    await mul_matA.transpose()
    await new Promise(r=>setTimeout(r,800));
    document.querySelectorAll(".mat-mul-syms").forEach(e=>e.style.opacity=1);
    await new Promise(r=>setTimeout(r,800));
    for (let i=0;i<m;i++){
        for (let j=0;j<p;j++){
            mul_matRes.highlight(i,j);
        }
    }
    await new Promise(r=>setTimeout(r,1600));
    for (let i=0;i<m;i++){
        for (let j=0;j<p;j++){
            mul_matRes.unhighlight(i,j);
        }
    }
    ["mat-mul-in1","mat-mul-in2","mat-mul-in3","mat-mul-animate"].forEach(id=>document.getElementById(id).disabled=false);
})