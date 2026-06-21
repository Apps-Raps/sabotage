# Sabotage — Light
# Sabotage syntax colors for PSReadLine. Add to your $PROFILE:
#   . "$HOME\sabotage-light.ps1"
# Requires PSReadLine 2.0+ (ships with PowerShell 7 / Windows PowerShell 5.1 + module).

Set-PSReadLineOption -Colors @{
    Command            = '#0e7490'
    Comment            = '#9395a0'
    ContinuationPrompt = '#9395a0'
    Default            = '#1a1c24'
    Emphasis           = '#dd5040'
    Error              = '#d32f2f'
    Keyword            = '#c8432f'
    Member             = '#0e7490'
    Number             = '#c2410c'
    Operator           = '#c026a0'
    Parameter          = '#c2410c'
    String             = '#1a9e5a'
    Type               = '#b7791f'
    Variable           = '#1a1c24'
    InlinePrediction   = '#9395a0'
    ListPrediction     = '#dd5040'
    Selection          = "`e[48;2;207;224;245m"
}

# Tip: pair with the Sabotage Windows Terminal scheme for a fully themed prompt.
