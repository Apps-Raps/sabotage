# Sabotage — Dark
# Sabotage syntax colors for PSReadLine. Add to your $PROFILE:
#   . "$HOME\sabotage-dark.ps1"
# Requires PSReadLine 2.0+ (ships with PowerShell 7 / Windows PowerShell 5.1 + module).

Set-PSReadLineOption -Colors @{
    Command            = '#4dd9ff'
    Comment            = '#5a5b63'
    ContinuationPrompt = '#5a5b63'
    Default            = '#e8e8ea'
    Emphasis           = '#dd5040'
    Error              = '#ff5555'
    Keyword            = '#dd5040'
    Member             = '#4dd9ff'
    Number             = '#ff8a44'
    Operator           = '#ff69b4'
    Parameter          = '#ff8a44'
    String             = '#2ecc71'
    Type               = '#ffd166'
    Variable           = '#e8e8ea'
    InlinePrediction   = '#5a5b63'
    ListPrediction     = '#dd5040'
    Selection          = "`e[48;2;42;58;82m"
}

# Tip: pair with the Sabotage Windows Terminal scheme for a fully themed prompt.
