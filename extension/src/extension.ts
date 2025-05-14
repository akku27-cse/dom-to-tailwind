import * as vscode from 'vscode';
import { convertToTailwind } from 'dom-to-tailwind';

export function activate(context: vscode.ExtensionContext) {
  console.log('DOM to Tailwind converter is now active!');

  // Register command for converting selection
  const convertSelectionCommand = vscode.commands.registerCommand(
    'dom-to-tailwind.convertSelection',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('No active editor found!');
        return;
      }

      const selection = editor.selection;
      if (selection.isEmpty) {
        vscode.window.showInformationMessage('No text selected. Please select some HTML to convert.');
        return;
      }

      const selectedText = editor.document.getText(selection);
      try {
        const converted = await convertToTailwind(selectedText);
        await editor.edit(editBuilder => {
          editBuilder.replace(selection, converted);
        });
        vscode.window.showInformationMessage('Successfully converted selection to Tailwind!');
      } catch (error) {
        vscode.window.showErrorMessage(`Error converting to Tailwind: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  );

  // Register command for converting entire file
  const convertFileCommand = vscode.commands.registerCommand(
    'dom-to-tailwind.convertFile',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('No active editor found!');
        return;
      }

      const document = editor.document;
      const fullText = document.getText();

      try {
        const converted = await convertToTailwind(fullText);
        const fullRange = new vscode.Range(
          document.positionAt(0),
          document.positionAt(fullText.length)
        );
        await editor.edit(editBuilder => {
          editBuilder.replace(fullRange, converted);
        });
        vscode.window.showInformationMessage('Successfully converted file to Tailwind!');
      } catch (error) {
        vscode.window.showErrorMessage(`Error converting to Tailwind: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  );

  context.subscriptions.push(convertSelectionCommand, convertFileCommand);
}

export function deactivate() {}