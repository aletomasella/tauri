#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// use std::{fs::File, io::Write};
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {  
    let mut greeting = format!("Hello, {}! You've been greeted from Rust!", name);
    greeting = greeting.to_ascii_uppercase();
     greeting
   }


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!()) 
        .expect("error while running tauri application"); 
}
