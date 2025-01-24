const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
app.use(express.static(path.join(__dirname, 'frontend')));

// function splitContentIntoSections(content) {
//     console.log("1");
//     const lines = content.split('***');
//     const sectionsCount = 4;
//     const sectionSize = Math.ceil(lines.length / sectionsCount);

//     const sections = [];
//     let mermaid = '';  // Initialize the "mermaid" variable

// //     // Process the first 3 sections
//     for (let i = 0; i < 3; i++) {
//         const sectionLines = lines.slice(i * sectionSize, (i + 1) * sectionSize);
//         sections.push(sectionLines.join('\n'));
//     }

// //     // Handle the last section (this becomes the "mermaid" variable)
//     mermaid = lines.slice(3 * sectionSize).join('\n');
    

//     const mermaidContent = mermaid;
//     generateMermaidImage(mermaidContent);
//     // Now, spawn the mermaid.py process
//     // let merimg = '';  // Variable to store the path of the generated image


//     async function generateMermaidImage(mermaidContent) {
//         try {
//             const response = await fetch('/generate-image', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ mermaid: mermaidContent }),
//             });
    
//             if (response.ok) {
//                 const data = await response.json();
//                 const imagePath = data.imagePath;  // URL to the generated image
//                 console.log('Generated image path:', imagePath);
    
//                 // Use the image URL to display the image
//                 document.getElementById('generatedImage').src = imagePath;
//             } else {
//                 console.error('Failed to generate image:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error generating image:', error);
//         }
//     }
    
//     return sections ;
// }



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
    mermaid = lines.slice(3 * sectionSize).join('\n');
    
    const mermaidContent = mermaid;
    generateMermaidImage(mermaidContent);  // Generate image for the last section

    return sections;
}

async function generateMermaidImage(mermaidContent) {
    try {
        const response = await fetch('/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mermaid: mermaidContent }),
        });

        if (response.ok) {
            const data = await response.json();
            const imagePath = data.imagePath;  // URL to the generated image
            console.log('Generated image path:', imagePath);

            // Display the generated image on the last subpage
            const imageElement = document.getElementById('generatedImage');
            imageElement.src = imagePath;  // Set the image source
        } else {
            console.error('Failed to generate image:', response.statusText);
        }
    } catch (error) {
        console.error('Error generating image:', error);
    }
}
