function splitContentIntoSections(content) {
    const lines = content.split('***');
    const sectionsCount = 4;
    const sectionSize = Math.ceil(lines.length / sectionsCount);

    const sections = [];
    let mermaid = '';  // Initialize the "mermaid" variable

    // Process the first 3 sections
    for (let i = 0; i < 3; i++) {
        const sectionLines = lines.slice(i * sectionSize, (i + 1) * sectionSize);
        sections.push(sectionLines.join('\n'));
    }

    // Handle the last section (this becomes the "mermaid" variable)
    // mermaid = lines.slice(3 * sectionSize).join('\n');
    // mermaid = "abc"
    // Write the "mermaid" content to a .txt file
    // writeMermaidToFile(mermaid);

    return sections;
}

// Function to write mermaid code to a .txt file
function writeMermaidToFile(mermaidCode) {
    const filePath = path.join(__dirname, 'mermaidCode.txt');
    
    fs.writeFile(filePath, mermaidCode, (err) => {
        if (err) {
            console.error('Error writing mermaid code to file:', err);
        } else {
            console.log('✓ Mermaid code successfully saved to mermaidCode.txt');
        }
    });
}