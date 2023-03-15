
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod model;
mod lexer;
use std::fs::{self, File};
use std::path::Path;
use xml::reader::{XmlEvent, EventReader};
use xml::common::{Position, TextPosition};
use std::env;
use std::result::Result;
use std::io::{BufReader};
use model::*;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

fn parse_entire_txt_file(file_path: &Path) -> Result<String, ()> {
 fs::read_to_string(file_path).map_err(|err| {
        eprintln!("ERROR: coult not open file {file_path}: {err}", file_path = file_path.display());
    })
}


fn parse_entire_xml_file(file_path: &Path) -> Result<String, ()> {
    let file = File::open(file_path).map_err(|err| {
        eprintln!("ERROR: could not open file {file_path}: {err}", file_path = file_path.display());
    })?;
    let er = EventReader::new(BufReader::new(file));
    let mut content = String::new();
    for event in er.into_iter() {
        let event = event.map_err(|err| {
            let TextPosition {row, column} = err.position();
            let msg = err.msg();
            eprintln!("{file_path}:{row}:{column}: ERROR: {msg}", file_path = file_path.display());
        })?;

        if let XmlEvent::Characters(text) = event {
            content.push_str(&text);
            content.push(' ');
        }
    }
    Ok(content)
}

fn parse_entire_file_by_extension(file_path: &Path) -> Result<String, ()> {
    let extension = file_path.extension().ok_or_else(|| {
        eprintln!("ERROR: can't detect file type of {file_path} without extension",
                  file_path = file_path.display());
    })?.to_string_lossy();
    match extension.as_ref() {
        "xhtml" | "xml" => parse_entire_xml_file(file_path),
        // TODO: specialized parser for markdown files
        "txt" | "md" => parse_entire_txt_file(file_path),
        _ => {
            eprintln!("ERROR: can't detect file type of {file_path}: unsupported extension {extension}",
                      file_path = file_path.display(),
                      extension = extension);
            Err(())
        }
    }
}


    

// TODO: add a command to add a single file to the model
#[tauri::command]
fn add_folder_to_model(dir_path: &Path, model: &mut dyn Model) -> Result<(), ()> {
    let dir = fs::read_dir(dir_path).map_err(|err| {
        eprintln!("ERROR: could not open directory {dir_path} for indexing: {err}",
                  dir_path = dir_path.display());
    })?;

 'next_file: for file in dir {
        let file = file.map_err(|err| {
            eprintln!("ERROR: could not read next file in directory {dir_path} during indexing: {err}",
                      dir_path = dir_path.display());
        })?;

        let file_path = file.path();

        let file_type = file.file_type().map_err(|err| {
            eprintln!("ERROR: could not determine type of file {file_path}: {err}",
                      file_path = file_path.display());
        })?;

        if file_type.is_dir() {
            add_folder_to_model(&file_path, model)?;
            continue 'next_file;
        }

        // TODO: how does this work with symlinks?

        println!("Indexing {:?}...", &file_path);

        let content = match parse_entire_file_by_extension(&file_path) {
            Ok(content) => content.chars().collect::<Vec<_>>(),
            Err(()) => {
                continue 'next_file;
            }
        };

        model.add_document(file_path, &content)?;
    }

    Ok(())
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![add_folder_to_model])
        .run(tauri::generate_context!()) 
        .expect("error while running tauri application"); 
}
