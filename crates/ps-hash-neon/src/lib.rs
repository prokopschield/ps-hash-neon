use neon::{prelude::*, types::buffer::TypedArray};

fn hash(mut cx: FunctionContext) -> JsResult<JsString> {
    let input = cx.argument::<JsUint8Array>(0)?;
    let hash = ps_hash::hash(input.as_slice(&cx));

    Ok(cx.string(hash))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("hash", hash)?;
    Ok(())
}
