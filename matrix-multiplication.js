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
            for (let k=0;k<n;k++){
                mul_matA.highlight(i,k);
                mul_matB.highlight(k,j);
                lol+=(mul_matA.get(i,k)*mul_matB.get(k,j))%prime
                lol%=prime
            }
            await new Promise(r=>setTimeout(r,1000));
            mul_matRes.set(i,j,lol);
            for (let k=0;k<n;k++){
                mul_matA.unhighlight(i,k);
                mul_matB.unhighlight(k,j);
            }
            mul_matRes.unhighlight(i,j);
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