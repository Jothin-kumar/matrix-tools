function clonePutToRightOfMatrix(c) {
    const f=()=>{
        const bcr=c.elem.parentElement.parentElement.getBoundingClientRect();
        c.clone.style.marginLeft=bcr.width+"px";
        if (c.timeout) {
            setTimeout(f,100)
        }
    }
    f()
}
function clonePutToLeftOfMatrix(c) {
    const f=()=>{
        const bcr=c.elem.parentElement.parentElement.getBoundingClientRect();
        c.clone.style.marginLeft=-bcr.width+"px";
        if (c.timeout) {
            setTimeout(f,100)
        }
    }
    f()
}
class detCalcStep {
    constructor(elem) {
        this.elem=elem
    }
    set(v) {
        const diff=this.elem.innerText!=v.toString()
        this.elem.innerText=v
        if (diff) {
            this.elem.style.color="orange"
            setTimeout(()=>{
                this.elem.style.color="white"
            },500)
        }
    }
}
const detCalcStep1=new detCalcStep(document.getElementById("det-calc-step-1"))
const detCalcStep2=new detCalcStep(document.getElementById("det-calc-step-2"))
const detCalcStep3=new detCalcStep(document.getElementById("det-calc-step-3"))


const detCalcStep1_1=detCalcStep1
const detCalcStep1_2=new detCalcStep(document.getElementById("det-calc-step-1-2"))
const detCalcStep1_3=new detCalcStep(document.getElementById("det-calc-step-1-3"))
const detCalcStep2_1=detCalcStep2
const detCalcStep2_2=new detCalcStep(document.getElementById("det-calc-step-2-2"))
const detCalcStep2_3=new detCalcStep(document.getElementById("det-calc-step-2-3"))
function calc_det(){
    const n=window.det_mat.n
    console.log(n);

    if (n==2) {
        let p=(window.det_mat.get(0,0)*window.det_mat.get(1,1))%prime
        let n=(window.det_mat.get(1,0)*window.det_mat.get(0,1))%prime
        let r=(p-n)%prime
        if (p<0) p+=prime
        if (n<0) n+=prime
        if (r<0) r+=prime
        detCalcStep1.set(p)
        detCalcStep2.set(n)
        detCalcStep3.set(r)
    }
    else {
        let p1=(window.det_mat.get(0,2)*window.det_mat.get(1,0)*window.det_mat.get(2,1))%prime
        let p2=(window.det_mat.get(0,0)*window.det_mat.get(1,1)*window.det_mat.get(2,2))%prime
        let p3=(window.det_mat.get(0,1)*window.det_mat.get(1,2)*window.det_mat.get(2,0))%prime
        if (p1<0)p1+=prime
        if (p2<0)p2+=prime
        if (p3<0)p3+=prime
        detCalcStep1_1.set(p1)
        detCalcStep1_2.set(p2)
        detCalcStep1_3.set(p3)
        
        let n1=(window.det_mat.get(0,1)*window.det_mat.get(1,0)*window.det_mat.get(2,2))%prime
        let n2=(window.det_mat.get(0,2)*window.det_mat.get(1,1)*window.det_mat.get(2,0))%prime
        let n3=(window.det_mat.get(0,0)*window.det_mat.get(1,2)*window.det_mat.get(2,1))%prime
        if (n1<0)n1+=prime
        if (n2<0)n2+=prime
        if (n3<0)n3+=prime
        detCalcStep2_1.set(n1)
        detCalcStep2_2.set(n2)
        detCalcStep2_3.set(n3)

        let r=(p1+p2+p3-n1-n2-n3)%prime
        if (r<0) r+=prime
        detCalcStep3.set(r)
        
    }
}
function det_matrix(){
    const n=parseInt(document.getElementById("determinant-n-input").value);
    document.querySelectorAll(".show-on-n3-not-n2").forEach(e=>e.style.display=n==2?"none":"block");
    [detCalcStep1_1,detCalcStep1_2,detCalcStep1_3,detCalcStep2_1,detCalcStep2_2,detCalcStep2_3,detCalcStep3 ].forEach(l=>l.set(" "))
    if (window.det_mat){
        window.det_mat.revokeParent(document.getElementById("determinant-parent"));
    }
    window.det_mat=new Matrix(n,n,true,calc_det);
    det_mat.useParent(document.getElementById("determinant-parent"));
    let c=1;
    for (let i=0;i<n;i++) {
        for (let j=0;j<n;j++) {
            det_mat.set(i,j,c++);
        }
    }
    calc_det()
}
document.getElementById("determinant-n-input").addEventListener("change",det_matrix);
det_matrix();
document.getElementById("determinant-btn").addEventListener("click",async ()=>{
    ["determinant-n-input","determinant-btn"].forEach(id=>document.getElementById(id).disabled=true);    
    det_mat.disableUserEdit();
    [detCalcStep1_1,detCalcStep1_2,detCalcStep1_3,detCalcStep2_1,detCalcStep2_2,detCalcStep2_3,detCalcStep3 ].forEach(l=>l.set(" "))
    await new Promise(r=>setTimeout(r,800))
    const n=det_mat.n
    if (n===2) {
        let p=(window.det_mat.get(0,0)*window.det_mat.get(1,1))%prime
        let n=(window.det_mat.get(1,0)*window.det_mat.get(0,1))%prime
        let r=(p-n)%prime
        if (p<0) p+=prime
        if (n<0) n+=prime
        if (r<0) r+=prime
        det_mat.highlight(0,0)
        det_mat.highlight(1,1)
        await new Promise(r=>setTimeout(r,1000))
        detCalcStep1.set(p)
        await new Promise(r=>setTimeout(r,1000))
        det_mat.unhighlight(0,0)
        det_mat.unhighlight(1,1)
        await new Promise(r=>setTimeout(r,1000))
        det_mat.highlight(1,0)
        det_mat.highlight(0,1)
        await new Promise(r=>setTimeout(r,1000))
        detCalcStep2.set(n)
        await new Promise(r=>setTimeout(r,1000))
        det_mat.unhighlight(1,0)
        det_mat.unhighlight(0,1)
        await new Promise(r=>setTimeout(r,1000))
        detCalcStep3.set(r)
        await new Promise(r=>setTimeout(r,800))
    }
    else { // n should be 3. if ur here cuz u tried to allow matrices of size more than 3 and realised it won't work, feel free to implement a generalised version :-)
        let p1=(window.det_mat.get(0,2)*window.det_mat.get(1,0)*window.det_mat.get(2,1))%prime
        let p2=(window.det_mat.get(0,0)*window.det_mat.get(1,1)*window.det_mat.get(2,2))%prime
        let p3=(window.det_mat.get(0,1)*window.det_mat.get(1,2)*window.det_mat.get(2,0))%prime
        if (p1<0)p1+=prime
        if (p2<0)p2+=prime
        if (p3<0)p3+=prime
        // detCalcStep1_1.set(p1)
        // detCalcStep1_2.set(p2)
        // detCalcStep1_3.set(p3)
        
        let n1=(window.det_mat.get(0,1)*window.det_mat.get(1,0)*window.det_mat.get(2,2))%prime
        let n2=(window.det_mat.get(0,2)*window.det_mat.get(1,1)*window.det_mat.get(2,0))%prime
        let n3=(window.det_mat.get(0,0)*window.det_mat.get(1,2)*window.det_mat.get(2,1))%prime
        if (n1<0)n1+=prime
        if (n2<0)n2+=prime
        if (n3<0)n3+=prime
        // detCalcStep2_1.set(n1)
        // detCalcStep2_2.set(n2)
        // detCalcStep2_3.set(n3)

        let r=(p1+p2+p3-n1-n2-n3)%prime
        if (r<0) r+=prime
        // detCalcStep3.set(r)
        async function do_clone(i1,j1,i2,j2,i3,j3) {
            await new Promise(r=>setTimeout(r,1000))
            det_mat.highlight(i1,j1)
            det_mat.highlight(i3,j3)
            await new Promise(r=>setTimeout(r,1000))
            const clone_for_p1=new Clone(det_mat.e.children[i1].children[j1],2)
            const clone_for_p3=new Clone(det_mat.e.children[i3].children[j3],2)
            clonePutToRightOfMatrix(clone_for_p3)
            clonePutToLeftOfMatrix(clone_for_p1)
            await new Promise(r=>setTimeout(r,1000))
            det_mat.unhighlight(i1,j1)
            det_mat.unhighlight(i3,j3)
            await new Promise(r=>setTimeout(r,1000));
            [clone_for_p1,clone_for_p3].forEach(c=>{
                c.clone.style.borderRadius="50%"
                c.clone.style.background="rgba(18, 26, 17, .7)"
            })
            await new Promise(r=>setTimeout(r,1600));
            return [clone_for_p1,clone_for_p3]
        }
        async function assign(i1,j1,i2,j2,i3,j3,elem1,elem2,elem3,step,v) { // each elem param is either the clone or the matrix itself, if the clone DNE
            let ans=(window.det_mat.get(i1,j1)*window.det_mat.get(i2,j2)*window.det_mat.get(i3,j3))%prime
            if (ans<0) ans+=prime;
            [[elem1,i1,j1],[elem2,i2,j2],[elem3,i3,j3]].forEach(x=>{
                const [elem,i,j]=x
                elem.highlight(i,j)
                setTimeout(()=>elem.unhighlight(i,j),4500)
            })
            await new Promise(r=>setTimeout(r,2000));
            step.set(v);
            await new Promise(r=>setTimeout(r,3000));
        }
        const [clone_for_p1,clone_for_p3]=await do_clone(0,2,1,0,2,0)
        await assign(0,2,1,0,2,1,clone_for_p1,det_mat,det_mat,detCalcStep1_1,p1)
        await assign(0,0,1,1,2,2,det_mat,det_mat,det_mat,detCalcStep1_2,p2)
        await assign(0,1,1,2,2,0,det_mat,det_mat,clone_for_p3,detCalcStep1_3,p3)
        await new Promise(r=>setTimeout(r,1600));
        clone_for_p1.kill()
        clone_for_p3.kill()
        await new Promise(r=>setTimeout(r,1600));
        const [clone_for_n1,clone_for_n3]=await do_clone(2,2,1,0,0,0)
        await assign(0,1,1,0,2,2,det_mat,det_mat,clone_for_n1,detCalcStep2_1,n1)
        await assign(0,2,1,1,2,0,det_mat,det_mat,det_mat,detCalcStep2_2,n2)
        await assign(0,0,1,2,2,1,clone_for_n3,det_mat,det_mat,detCalcStep2_3,n3)
        await new Promise(r=>setTimeout(r,1600));
        clone_for_n1.kill()
        clone_for_n3.kill()
        await new Promise(r=>setTimeout(r,1600));
        detCalcStep3.set(r)
        await new Promise(r=>setTimeout(r,1600));
    }
    ["determinant-n-input","determinant-btn"].forEach(id=>document.getElementById(id).disabled=false);
    det_mat.enableUserEdit()
})