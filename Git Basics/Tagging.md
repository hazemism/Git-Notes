## Creating Tags
git supports two type of tags **lightweight** and **annotated**
- **lightweight** tag, its just a pointer to a specific commit (not creating object).
- **annotated** tag, are stored as full objects in the Git database, contain the tagger name, email, and date, have a tagging message.
==releases/versioning should be annotated because they carry authorship + a message, lightweight is more for quick/local bookmarks.==
---
### Annotated Tag  (object)
```
$ git tag -a <tag-name> -m "message"
```
The `-m` specifies a tagging message, which is stored with the tag.
This tag is creating message for the tag, save the tagger (name + email) and the date.
You can see the tag data along with the commit that was tagged by using the `git show` command.
```
$ git show <tag-name>

tag <tag-name> 
Tagger: <name> <<email>> 
Date: <date> 

<tag message>
 
commit <full-commit-sha> 
Author: <name> <<email>> --> Author of the commit
Date: <date> 

<commit message, indented 4 spaces>
``` 
### Lightweight Tag

```
git tag <tag-name>
```
this creating a tag without an object or save tag-name, tagger, date and message
```
$ git show <tag-name>

commit <full-commit-sha> 
Author: <name> <<email>> --> Author of the commit
Date: <date> 

<commit message, indented 4 spaces>
```
### Tagging Later
```console
$ git tag -a <tag-name> <commit-sha> (not the full sha)
```
### Sharing Tags
```
git push origin <tag-name>
```
By default, the `git push` command doesn’t transfer tags to remote servers, You will have to explicitly push tags to a shared server after you have created them.

If you have a lot of tags that you want to push up at once
```
git push origin --tags
```
## listing tags
to listing the existing tags, just type `git tag` with optional `-l` or `--list`
note: for make `git tag` search for specific tag instead of creating use `-l` or `--list`

| Command             | meaning                                                          |
| ------------------- | :--------------------------------------------------------------- |
| `git tag`           | List all tags (unambiguous — no name given)                      |
| `git tag v1.0`      | Create a tag named `v1.0`                                        |
| `git tag "v1.*"`    | Tries to create a tag literally named `v1.*` — not what you want |
| `git tag -l "v1.*"` | List tags matching the pattern `v1.*`                            |
