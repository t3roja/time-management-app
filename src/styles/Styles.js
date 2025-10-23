
export const styles = {

    card: {
        borderRadius: 3,
        boxShadow: 2,
        transition: '0.3s',
        '&:hover': { boxShadow: 4 },
    },
    newCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: 0.8,
        transition: '0.2s',
        '&:hover': { opacity: 1, borderColor: 'primary.main', boxShadow: 3 },     
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mainBox:
    {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 1
    },
    entryBox:
    {
        display: 'flex',
        justifyContent: 'space-between',
        py: 0.5,
        borderBottom: `1px solid ${'border.main'}`,
    },
    clickableBox: {
        display: 'flex',
        justifyContent: 'space-between',
        py: 0.5,
        borderBottom: '1px solid #eee',
        '&:hover': { backgroundColor: 'colors.secondary' },
    }
}