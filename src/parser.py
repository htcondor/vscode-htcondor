from bs4 import BeautifulSoup
import os

# create a directory to store all html files
if not os.path.exists("html_files"):
    os.makedirs("html_files")

with open("submitCommands.html", "r") as f:
    contents = f.read()

soup = BeautifulSoup(contents, 'html.parser')

# Remove style attributes
for tag in soup():
    for attribute in ["class", "id", "name", "style"]:
        del tag[attribute]
        
# get dt tags
dt_tags = soup.find_all('dt')

for dt in dt_tags:
    # get the term (first word of the dt tag)
    term = dt.text.split()[0]
    filename = f"html_files/{term}.html"

    # Create Markdown formatted string (code block) from dt tag
    md_string = '<pre>' + dt.text.replace('<', '&lt;').replace('>', '&gt;').replace('\n', '\n') + '</pre>'

    # Write dt tag to file
    with open(filename, 'a') as f:
        f.write(md_string)

    # get the next sibling (should be a dd tag)
    dd = dt.find_next_sibling('dd')
    if dd is not None:
        with open(filename, 'a') as f:
            f.write(str(dd))


# create a directory to store all md files
if not os.path.exists("md_files"):
    os.makedirs("md_files")

# convert all html files to md files using pandoc
for filename in os.listdir("html_files"):
    os.system(f"pandoc html_files/{filename} -o md_files/{filename.split('.')[0]}.md")




