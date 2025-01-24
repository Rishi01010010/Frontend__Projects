import sys
import google.generativeai as genai
import json

# Configure the Google Gemini API
genai.configure(api_key="AIzaSyAH3nXug262foRug7tPKQHePBXuImgOulM")  # Replace with your actual API key

generation_config = {
    "temperature": 1.0, 
    "top_p": 1.0,
    "top_k": 0,
    "max_output_tokens": 10000,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)
chat_session = model.start_chat(history=[])



# Generate the animal story
story_request = f"""

Imagine you are a teacher explaining the topic BART system from the below text to a 20-year-old student.

Refer to the below text completely and explain the concept in depth at an intermediate level (not too easy, not too complex).
Explain each and every important point mentioned about the BART system in the text.

I want the response  to contain only the 4 fields they are explanation, analogy, example, flowchart(mermaid code) all seperated by a "***".
I am using your response in a code so no extra characters please.
The response should not contain any "*" or "#" or any highlighted headings like * **Definition:**
Please avoid overloading with extra information and do not include any additional introductory text or characters like "*" or "#", etc.
Please use simple terms for in-depth explanation.

Make sure to return the response in the below format.

"
 Explanation: Pluripotent stem cells are like master cells that have the potential to develop into almost any type of cell in the body. They can be guided to become specialized cells, like muscle cells, nerve cells, or blood cells. Pluripotent stem cells are undifferentiated cells that can self-renew and differentiate into various cell types, except for cells that make up the placenta. They hold great promise for treating diseases and injuries by replacing damaged or diseased cells.***
Example: Embryonic stem cells are a type of pluripotent stem cell found in early embryos. These cells have the potential to develop into any cell type in the body.***
Analogy: Imagine a tree. The seed is like a pluripotent stem cell. It has the potential to grow into a whole tree with branches, leaves, and roots. The seed can be guided to develop into different parts of the tree depending on the environment and signals it receives.***
graph TD
A[Pluripotent Stem Cells] --> B[Muscle Cells]
A --> C[Nerve Cells]
A --> D[Blood Cells]
A --> E[Other Cell Types]
A --> F[Not Placenta Cells]
A --> G[Self-Renewal]
A --> H[Differentiation]
H --> B
H --> C
H --> D
H --> E

    please don't give the full mermaid code in a single line, give it correctly after double checking add all the characters that is required.
    add the newline characters properly wherever it is required.

text: "The **Bay Area Rapid Transit (BART)** system is a public transportation network serving the San Francisco Bay Area, primarily in California. BART connects several cities across five counties, including San Francisco, Oakland, Berkeley, and other nearby communities. Here’s a breakdown of how the system works and what makes it unique:

### 1. **History and Purpose**
   - BART was established in the 1970s to address rising traffic congestion and to provide a fast, reliable alternative for commuters in the growing Bay Area.
   - The system initially covered just a few routes but has expanded over the years as the population and demand have grown.

### 2. **System Layout**
   - **Lines**: BART operates five main lines (Red, Yellow, Green, Orange, and Blue), each identified by color and route endpoints. The lines crisscross the Bay Area, with some extending as far as the East Bay and South Bay regions.
   - **Stations**: There are currently 50+ BART stations, strategically located near residential and commercial centers, major shopping areas, and schools.

### 3. **Train Operations**
   - **Electric-Powered Trains**: BART trains are powered by electricity and run on standard gauge tracks. Trains are designed to be quiet and energy-efficient, with newer models incorporating modern technology and passenger comfort features.
   - **Automatic Train Control (ATC)**: BART is known for its Automatic Train Control system, which helps regulate train speeds and intervals for optimal safety and efficiency.

### 4. **Fares and Ticketing**
   - BART uses a distance-based fare system, meaning ticket prices are determined by the distance traveled. Riders use a BART ticket or a Clipper Card to enter and exit stations.
   - Fares are generally higher for longer trips and lower for shorter commutes within a specific zone.
   
### 5. **Connections and Accessibility**
   - BART connects with multiple public transit systems, such as Muni (San Francisco Municipal Transportation Agency) in San Francisco, AC Transit in the East Bay, and VTA (Santa Clara Valley Transportation Authority).
   - Stations are designed to be accessible to people with disabilities, offering elevators, ramps, and other accommodations.

### 6. **Popular Routes and Ridership**
   - BART’s routes are especially popular among commuters traveling between residential areas in the East Bay and work locations in San Francisco or Silicon Valley.
   - Popular stations include the downtown San Francisco stations (Embarcadero, Montgomery, Powell, Civic Center) and transit hubs like the Oakland Coliseum and Richmond.

### 7. **Benefits of BART**
   - **Reduced Traffic**: By providing an alternative to car travel, BART helps reduce congestion on bridges, highways, and roads.
   - **Environmental Impact**: BART’s electric trains reduce carbon emissions by offering a sustainable transit alternative.
   - **Economic Boost**: BART supports the regional economy by improving access to jobs, businesses, and educational institutions.

### 8. **Future Developments**
   - BART is continually working on expansions, such as the extension into Silicon Valley. They’re also modernizing trains and infrastructure to accommodate increased ridership and enhance safety.
   - Ongoing projects focus on increasing the reliability of the system, reducing noise, and making stations more user-friendly.

In essence, BART serves as a backbone of the Bay Area’s public transportation, facilitating efficient movement across the region and connecting people to key areas and resources."
"""
story_response = chat_session.send_message(story_request)
generated_story = story_response.text

# Output the generated story
print(generated_story)