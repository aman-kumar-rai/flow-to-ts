# Flow to TypeScript Migration Tool

A command-line tool that automatically converts Flow type annotations to TypeScript using JSCodeshift.

## How it Works

The transformation process follows these steps:

1. **AST Parsing**: 
   - Uses JSCodeshift with Flow parser to create an Abstract Syntax Tree (AST) from the source code
   - The AST represents the code structure in a way that can be programmatically analyzed and modified

2. **Type Transformation**:
   - Identifies Flow type annotations in the AST
   - Converts each Flow type to its TypeScript equivalent:
     - Basic types (number, string, boolean, any, void)
     - Nullable types → Union types with null
     - Array types
     - Union types
     - Generic types
     - Object types
     - Interface declarations
     - Type aliases

3. **Code Generation**:
   - Converts the modified AST back to source code
   - Preserves original formatting and comments where possible