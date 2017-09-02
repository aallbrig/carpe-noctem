### One Liners
* OSX say command TLDR (though, run `man say` for more information)
    ```
    # say \
    # -v { voice actor } \
    # -f { .txt file } \
    # -r { speaking rate (words per minute)n }
    # -o { output file (.aiff, .mp4)}
    ```
* See all available voices
    ```
    say -v '?'
    ```
* Generate assets into an output directory (see the playbook file for details)
    ```
    ansible-playbook read-scripts-and-generate-audio-assets.yml
    ```

### Research
1. [Use OSX voices to output text to supported audio files](http://infoheap.com/convert-text-to-speech-on-mac-using-utility-say/)
1. `man say` (look up the manual for the "say" command)
