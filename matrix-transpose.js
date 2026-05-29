function transpose_matrix(){
    const m=parseInt(document.getElementById("mat-transpose-in1").value);
    const n=parseInt(document.getElementById("mat-transpose-in2").value);
    if (window.t_mat){
        window.t_mat.revokeParent(document.getElementById("mat-transpose-parent"));
    }
    window.t_mat=new Matrix(m,n,true);
    t_mat.useParent(document.getElementById("mat-transpose-parent"));
    let c=1;
    for (let i=0;i<m;i++) {
        for (let j=0;j<n;j++) {
            t_mat.set(i,j,c++);
        }
    }
}
["mat-transpose-in1","mat-transpose-in2"].forEach(id=>{
    document.getElementById(id).addEventListener("change",transpose_matrix);
});
transpose_matrix();
document.getElementById("mat-transpose-btn").addEventListener("click",async ()=>{
    ["mat-transpose-in1","mat-transpose-in2","mat-transpose-btn"].forEach(id=>document.getElementById(id).disabled=true);
    const t=document.getElementById("mat-transpose-in2").value;
    document.getElementById("mat-transpose-in2").value=document.getElementById("mat-transpose-in1").value;
    document.getElementById("mat-transpose-in1").value=t;
    await t_mat.transpose();
    ["mat-transpose-in1","mat-transpose-in2","mat-transpose-btn"].forEach(id=>document.getElementById(id).disabled=false);
})