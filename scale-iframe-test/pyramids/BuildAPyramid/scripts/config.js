const config = {
    onStartup: {
        showMouse: true,
        enableContextMenu: true,
        enableF12Key: true,
        enableDoubleClick: false,
    },
    content: {
        common: {
            nextButtonText: 'Next',
            selectButtonText: 'Select',
            years: 'years'
        },
        screens: {
            attractScreen: {
                backgroundVideo: 'assets/attract/attract.mp4',
                title: 'Build a Pyramid',
                buttonText: 'Touch screen to begin'
            },
            introductionScreen: {
                backgroundVideo: 'assets/common/riverbank.mp4',
                title: 'Build a Pyramid',
                buttonText: 'Start',
                dialog1: 'Hello! I\'m the Prime Minister Kagemni.',
                dialog2: 'Let\'s build a grand pyramid for the<br>king\'s tomb.<br><br>Your pyramid should be made to last for thousands of years, and you must finish it before the king dies!'
            },
            selectSiteScreen: {
                dialog1: 'Select where to build your pyramid.',
                dialog2: '<br>Remember, you need to move materials and workers along the River Nile. You\'ll have to dig canals to reach sites away from the river.'
            },
            selectSitePopupScreen: {
                backButtonText: 'Back to map'
            },
            adjustSizeScreen: {
                title: 'Adjust size',
                width: 'Width',
                height: 'Height',
                dialog1: 'Try experimenting with different sizes of pyramid, but be careful! Some angles can make your pyramid unstable.',
                dialog2: '<br>Use the sliders to adjust the size.'
            },
            chooseMaterialsScreen: {
                dialog1: 'Now, choose your materials',
                limestone: {
                    label: 'Local and polished limestone',
                    dialog: 'Good choice! This is what King Khufu used to build the Great Pyramid. The polished white limestone will make your pyramid shine like the sun!'
                },
                granite: {
                    label: 'Limestone and pink granite',
                    dialog: 'Solid choice! Granite looks impressive and will last a long time. However, it is slow to carve, and is harder to move.'
                },
                mudbricks: {
                    label: 'Mud bricks and limestone',
                    dialog: 'Mud bricks are quick and easy to<br>make. Hopefully, nobody will notice the difference if you cover it with limestone. Your pyramid will look good, but<br>may not last!'
                }
            },
            selectWorkforceScreen: {
                dialog1: 'The king summons his people to build his pyramid. Every man must serve, but most are only asked every few years. You\'ll need to provide food and shelter for them.',
                buttonText: 'Build pyramid!',
                small: {
                    label: 'Small workforce',
                    dialog: 'A small workforce is easier to feed, but will they finish the pyramid before the king dies?'
                },
                medium: {
                    label: 'Medium workforce',
                    dialog: 'That seems about right. With this number of people you should finish your pyramid in time.'
                },
                large: {
                    label: 'Large workforce',
                    dialog: 'That\'s a lot of workers! You\'ll be able to build very quickly, but how long can you keep them fed and happy?'
                }
            },
            buildingPyramidScreen: {
                title: 'Building your pyramid'
            },
            scenarioScreen: {
                question: 'What would you like to do to try and fix this?'
            },
            finalScreen: {
                title: 'Your final pyramid'
            },
            scoreScreen: {
                description: 'Let\'s see how you did. Will the king be pleased?',
                label1: 'Lifespan',
                scoreText1: 'How long will it last?',
                label2: 'Productivity',
                scoreText2: 'Your building skills',
                label3: 'Grandeur',
                scoreText3: 'How does it look?',
                buttonText: 'Try again'
            },
            timeoutScreen: {
                timeoutOverallInSeconds: 120,
                countdownOverallInSeconds: 10,
                title: "Are you still there?",
                prompt: 'Touch the screen to continue'
            }
        },
        gameMatrix:
        {
            higherGround: {
                title: 'Higher ground',
                content: 'The higher ground will make your pyramid look bigger, but it will take longer to move materials and workers from the river.',
                backgroundVideo: 'assets/common/higher-ground.mp4'
            },
            riverBank: {
                title: 'Riverbank',
                content: 'The river makes it easy to move materials and workers, but it could also flood your pyramid!',
                backgroundVideo: 'assets/common/riverbank.mp4'
            },
            desert: {
                title: 'Desert',
                content: 'Your pyramid will stand out in the desert, but sandy ground is less stable. It will be harder to move materials to your site.',
                backgroundVideo: 'assets/common/desert.mp4'
            },

            adjustSizeScreenDialogs: [
                { width: 1, height: 1, choise: 'Thin and short', feedback: 'That’s quite small. Are you sure this will be grand enough for the king?' },
                { width: 1, height: 2, choise: 'Thin and medium height', feedback: 'That’s quite pointy! Are you sure that\'s what you want to do?' },
                { width: 1, height: 3, choise: 'Thin and tall', feedback: 'That looks a bit unusual, it\'s very thin!' },
                { width: 2, height: 1, choise: 'Medium width and short', feedback: 'Looks good, but I think it needs to be taller to impress the king!' },
                { width: 2, height: 2, choise: 'Medium width and medium height', feedback: 'Great job! That looks exactly like the Great Pyramid of King Khufu!' },
                { width: 2, height: 3, choise: 'Medium width and tall', feedback: 'That\'s very high! You pyramid may be a bit wobbly.' },
                { width: 3, height: 1, choise: 'Wide and short', feedback: 'A bit boring! It looks more like a hill than a pyramid.' },
                { width: 3, height: 2, choise: 'Wide and medium height', feedback: 'Very impressive! But are you sure there\'s enough space to build it?' },
                { width: 3, height: 3, choise: 'Wide and tall', feedback: 'It\'s huge! That will take a long time to build, plus you\'ll need more materials and workers!' }
            ],

            decisionTree: [
                { location: 'higher-ground', width: 1, height: 1, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 1, height: 1, material: 'limestone', workforce: 'medium', scenario: 2 },
                { location: 'higher-ground', width: 1, height: 1, material: 'limestone', workforce: 'large', scenario: 2 },
                { location: 'higher-ground', width: 1, height: 1, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 1, height: 1, material: 'granite', workforce: 'medium', scenario: 2 },
                { location: 'higher-ground', width: 1, height: 1, material: 'granite', workforce: 'large', scenario: 2 },
                { location: 'higher-ground', width: 1, height: 1, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 1, height: 1, material: 'mudbricks', workforce: 'medium', scenario: 2 },
                { location: 'higher-ground', width: 1, height: 1, material: 'mudbricks', workforce: 'large', scenario: 2 },
                { location: 'higher-ground', width: 1, height: 2, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 1, height: 2, material: 'limestone', workforce: 'medium', scenario: 1 },
                { location: 'higher-ground', width: 1, height: 2, material: 'limestone', workforce: 'large', scenario: 1 },
                { location: 'higher-ground', width: 1, height: 2, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 1, height: 2, material: 'granite', workforce: 'medium', scenario: 1 },
                { location: 'higher-ground', width: 1, height: 2, material: 'granite', workforce: 'large', scenario: 1 },
                { location: 'higher-ground', width: 1, height: 2, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 1, height: 2, material: 'mudbricks', workforce: 'medium', scenario: 1 },
                { location: 'higher-ground', width: 1, height: 2, material: 'mudbricks', workforce: 'large', scenario: 1 },
                { location: 'higher-ground', width: 1, height: 3, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 1, height: 3, material: 'limestone', workforce: 'medium', scenario: 1 },
                { location: 'higher-ground', width: 1, height: 3, material: 'limestone', workforce: 'large', scenario: 1 },
                { location: 'higher-ground', width: 1, height: 3, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 1, height: 3, material: 'granite', workforce: 'medium', scenario: 1 },
                { location: 'higher-ground', width: 1, height: 3, material: 'granite', workforce: 'large', scenario: 1 },
                { location: 'higher-ground', width: 1, height: 3, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 1, height: 3, material: 'mudbricks', workforce: 'medium', scenario: 1 },
                { location: 'higher-ground', width: 1, height: 3, material: 'mudbricks', workforce: 'large', scenario: 1 },
                { location: 'higher-ground', width: 2, height: 1, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 2, height: 1, material: 'limestone', workforce: 'medium', scenario: 2 },
                { location: 'higher-ground', width: 2, height: 1, material: 'limestone', workforce: 'large', scenario: 2 },
                { location: 'higher-ground', width: 2, height: 1, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 2, height: 1, material: 'granite', workforce: 'medium', scenario: 2 },
                { location: 'higher-ground', width: 2, height: 1, material: 'granite', workforce: 'large', scenario: 2 },
                { location: 'higher-ground', width: 2, height: 1, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 2, height: 1, material: 'mudbricks', workforce: 'medium', scenario: 2 },
                { location: 'higher-ground', width: 2, height: 1, material: 'mudbricks', workforce: 'large', scenario: 2 },
                { location: 'higher-ground', width: 2, height: 2, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 2, height: 2, material: 'limestone', workforce: 'medium', scenario: 2 },
                { location: 'higher-ground', width: 2, height: 2, material: 'limestone', workforce: 'large', scenario: 2 },
                { location: 'higher-ground', width: 2, height: 2, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 2, height: 2, material: 'granite', workforce: 'medium', scenario: 2 },
                { location: 'higher-ground', width: 2, height: 2, material: 'granite', workforce: 'large', scenario: 2 },
                { location: 'higher-ground', width: 2, height: 2, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 2, height: 2, material: 'mudbricks', workforce: 'medium', scenario: 2 },
                { location: 'higher-ground', width: 2, height: 2, material: 'mudbricks', workforce: 'large', scenario: 2 },
                { location: 'higher-ground', width: 2, height: 3, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 2, height: 3, material: 'limestone', workforce: 'medium', scenario: 1 },
                { location: 'higher-ground', width: 2, height: 3, material: 'limestone', workforce: 'large', scenario: 1 },
                { location: 'higher-ground', width: 2, height: 3, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 2, height: 3, material: 'granite', workforce: 'medium', scenario: 1 },
                { location: 'higher-ground', width: 2, height: 3, material: 'granite', workforce: 'large', scenario: 1 },
                { location: 'higher-ground', width: 2, height: 3, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 2, height: 3, material: 'mudbricks', workforce: 'medium', scenario: 1 },
                { location: 'higher-ground', width: 2, height: 3, material: 'mudbricks', workforce: 'large', scenario: 1 },
                { location: 'higher-ground', width: 3, height: 1, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 3, height: 1, material: 'limestone', workforce: 'medium', scenario: 2 },
                { location: 'higher-ground', width: 3, height: 1, material: 'limestone', workforce: 'large', scenario: 2 },
                { location: 'higher-ground', width: 3, height: 1, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 3, height: 1, material: 'granite', workforce: 'medium', scenario: 2 },
                { location: 'higher-ground', width: 3, height: 1, material: 'granite', workforce: 'large', scenario: 2 },
                { location: 'higher-ground', width: 3, height: 1, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 3, height: 1, material: 'mudbricks', workforce: 'medium', scenario: 2 },
                { location: 'higher-ground', width: 3, height: 1, material: 'mudbricks', workforce: 'large', scenario: 2 },
                { location: 'higher-ground', width: 3, height: 2, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 3, height: 2, material: 'limestone', workforce: 'medium', scenario: 2 },
                { location: 'higher-ground', width: 3, height: 2, material: 'limestone', workforce: 'large', scenario: 2 },
                { location: 'higher-ground', width: 3, height: 2, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 3, height: 2, material: 'granite', workforce: 'medium', scenario: 2 },
                { location: 'higher-ground', width: 3, height: 2, material: 'granite', workforce: 'large', scenario: 2 },
                { location: 'higher-ground', width: 3, height: 2, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 3, height: 2, material: 'mudbricks', workforce: 'medium', scenario: 2 },
                { location: 'higher-ground', width: 3, height: 2, material: 'mudbricks', workforce: 'large', scenario: 2 },
                { location: 'higher-ground', width: 3, height: 3, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 3, height: 3, material: 'limestone', workforce: 'medium', scenario: 1 },
                { location: 'higher-ground', width: 3, height: 3, material: 'limestone', workforce: 'large', scenario: 1 },
                { location: 'higher-ground', width: 3, height: 3, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 3, height: 3, material: 'granite', workforce: 'medium', scenario: 1 },
                { location: 'higher-ground', width: 3, height: 3, material: 'granite', workforce: 'large', scenario: 1 },
                { location: 'higher-ground', width: 3, height: 3, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'higher-ground', width: 3, height: 3, material: 'mudbricks', workforce: 'medium', scenario: 1 },
                { location: 'higher-ground', width: 3, height: 3, material: 'mudbricks', workforce: 'large', scenario: 1 },
                { location: 'riverbank', width: 1, height: 1, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 1, height: 1, material: 'limestone', workforce: 'medium', scenario: 2 },
                { location: 'riverbank', width: 1, height: 1, material: 'limestone', workforce: 'large', scenario: 2 },
                { location: 'riverbank', width: 1, height: 1, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 1, height: 1, material: 'granite', workforce: 'medium', scenario: 2 },
                { location: 'riverbank', width: 1, height: 1, material: 'granite', workforce: 'large', scenario: 2 },
                { location: 'riverbank', width: 1, height: 1, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 1, height: 1, material: 'mudbricks', workforce: 'medium', scenario: 3 },
                { location: 'riverbank', width: 1, height: 1, material: 'mudbricks', workforce: 'large', scenario: 3 },
                { location: 'riverbank', width: 1, height: 2, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 1, height: 2, material: 'limestone', workforce: 'medium', scenario: 1 },
                { location: 'riverbank', width: 1, height: 2, material: 'limestone', workforce: 'large', scenario: 1 },
                { location: 'riverbank', width: 1, height: 2, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 1, height: 2, material: 'granite', workforce: 'medium', scenario: 1 },
                { location: 'riverbank', width: 1, height: 2, material: 'granite', workforce: 'large', scenario: 1 },
                { location: 'riverbank', width: 1, height: 2, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 1, height: 2, material: 'mudbricks', workforce: 'medium', scenario: 1 },
                { location: 'riverbank', width: 1, height: 2, material: 'mudbricks', workforce: 'large', scenario: 1 },
                { location: 'riverbank', width: 1, height: 3, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 1, height: 3, material: 'limestone', workforce: 'medium', scenario: 1 },
                { location: 'riverbank', width: 1, height: 3, material: 'limestone', workforce: 'large', scenario: 1 },
                { location: 'riverbank', width: 1, height: 3, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 1, height: 3, material: 'granite', workforce: 'medium', scenario: 1 },
                { location: 'riverbank', width: 1, height: 3, material: 'granite', workforce: 'large', scenario: 1 },
                { location: 'riverbank', width: 1, height: 3, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 1, height: 3, material: 'mudbricks', workforce: 'medium', scenario: 1 },
                { location: 'riverbank', width: 1, height: 3, material: 'mudbricks', workforce: 'large', scenario: 1 },
                { location: 'riverbank', width: 2, height: 1, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 2, height: 1, material: 'limestone', workforce: 'medium', scenario: 2 },
                { location: 'riverbank', width: 2, height: 1, material: 'limestone', workforce: 'large', scenario: 2 },
                { location: 'riverbank', width: 2, height: 1, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 2, height: 1, material: 'granite', workforce: 'medium', scenario: 3 },
                { location: 'riverbank', width: 2, height: 1, material: 'granite', workforce: 'large', scenario: 3 },
                { location: 'riverbank', width: 2, height: 1, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 2, height: 1, material: 'mudbricks', workforce: 'medium', scenario: 2 },
                { location: 'riverbank', width: 2, height: 1, material: 'mudbricks', workforce: 'large', scenario: 2 },
                { location: 'riverbank', width: 2, height: 2, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 2, height: 2, material: 'limestone', workforce: 'medium', scenario: 2 },
                { location: 'riverbank', width: 2, height: 2, material: 'limestone', workforce: 'large', scenario: 2 },
                { location: 'riverbank', width: 2, height: 2, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 2, height: 2, material: 'granite', workforce: 'medium', scenario: 2 },
                { location: 'riverbank', width: 2, height: 2, material: 'granite', workforce: 'large', scenario: 2 },
                { location: 'riverbank', width: 2, height: 2, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 2, height: 2, material: 'mudbricks', workforce: 'medium', scenario: 3 },
                { location: 'riverbank', width: 2, height: 2, material: 'mudbricks', workforce: 'large', scenario: 3 },
                { location: 'riverbank', width: 2, height: 3, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 2, height: 3, material: 'limestone', workforce: 'medium', scenario: 2 },
                { location: 'riverbank', width: 2, height: 3, material: 'limestone', workforce: 'large', scenario: 2 },
                { location: 'riverbank', width: 2, height: 3, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 2, height: 3, material: 'granite', workforce: 'medium', scenario: 2 },
                { location: 'riverbank', width: 2, height: 3, material: 'granite', workforce: 'large', scenario: 2 },
                { location: 'riverbank', width: 2, height: 3, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 2, height: 3, material: 'mudbricks', workforce: 'medium', scenario: 3 },
                { location: 'riverbank', width: 2, height: 3, material: 'mudbricks', workforce: 'large', scenario: 3 },
                { location: 'riverbank', width: 3, height: 1, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 3, height: 1, material: 'limestone', workforce: 'medium', scenario: 2 },
                { location: 'riverbank', width: 3, height: 1, material: 'limestone', workforce: 'large', scenario: 2 },
                { location: 'riverbank', width: 3, height: 1, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 3, height: 1, material: 'granite', workforce: 'medium', scenario: 2 },
                { location: 'riverbank', width: 3, height: 1, material: 'granite', workforce: 'large', scenario: 2 },
                { location: 'riverbank', width: 3, height: 1, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 3, height: 1, material: 'mudbricks', workforce: 'medium', scenario: 3 },
                { location: 'riverbank', width: 3, height: 1, material: 'mudbricks', workforce: 'large', scenario: 3 },
                { location: 'riverbank', width: 3, height: 2, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 3, height: 2, material: 'limestone', workforce: 'medium', scenario: 2 },
                { location: 'riverbank', width: 3, height: 2, material: 'limestone', workforce: 'large', scenario: 2 },
                { location: 'riverbank', width: 3, height: 2, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 3, height: 2, material: 'granite', workforce: 'medium', scenario: 2 },
                { location: 'riverbank', width: 3, height: 2, material: 'granite', workforce: 'large', scenario: 2 },
                { location: 'riverbank', width: 3, height: 2, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 3, height: 2, material: 'mudbricks', workforce: 'medium', scenario: 3 },
                { location: 'riverbank', width: 3, height: 2, material: 'mudbricks', workforce: 'large', scenario: 3 },
                { location: 'riverbank', width: 3, height: 3, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 3, height: 3, material: 'limestone', workforce: 'medium', scenario: 2 },
                { location: 'riverbank', width: 3, height: 3, material: 'limestone', workforce: 'large', scenario: 2 },
                { location: 'riverbank', width: 3, height: 3, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 3, height: 3, material: 'granite', workforce: 'medium', scenario: 2 },
                { location: 'riverbank', width: 3, height: 3, material: 'granite', workforce: 'large', scenario: 2 },
                { location: 'riverbank', width: 3, height: 3, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'riverbank', width: 3, height: 3, material: 'mudbricks', workforce: 'medium', scenario: 3 },
                { location: 'riverbank', width: 3, height: 3, material: 'mudbricks', workforce: 'large', scenario: 3 },
                { location: 'desert', width: 1, height: 1, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 1, height: 1, material: 'limestone', workforce: 'medium', scenario: 4 },
                { location: 'desert', width: 1, height: 1, material: 'limestone', workforce: 'large', scenario: 4 },
                { location: 'desert', width: 1, height: 1, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 1, height: 1, material: 'granite', workforce: 'medium', scenario: 4 },
                { location: 'desert', width: 1, height: 1, material: 'granite', workforce: 'large', scenario: 4 },
                { location: 'desert', width: 1, height: 1, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 1, height: 1, material: 'mudbricks', workforce: 'medium', scenario: 2 },
                { location: 'desert', width: 1, height: 1, material: 'mudbricks', workforce: 'large', scenario: 2 },
                { location: 'desert', width: 1, height: 2, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 1, height: 2, material: 'limestone', workforce: 'medium', scenario: 1 },
                { location: 'desert', width: 1, height: 2, material: 'limestone', workforce: 'large', scenario: 1 },
                { location: 'desert', width: 1, height: 2, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 1, height: 2, material: 'granite', workforce: 'medium', scenario: 1 },
                { location: 'desert', width: 1, height: 2, material: 'granite', workforce: 'large', scenario: 1 },
                { location: 'desert', width: 1, height: 2, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 1, height: 2, material: 'mudbricks', workforce: 'medium', scenario: 1 },
                { location: 'desert', width: 1, height: 2, material: 'mudbricks', workforce: 'large', scenario: 1 },
                { location: 'desert', width: 1, height: 3, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 1, height: 3, material: 'limestone', workforce: 'medium', scenario: 1 },
                { location: 'desert', width: 1, height: 3, material: 'limestone', workforce: 'large', scenario: 1 },
                { location: 'desert', width: 1, height: 3, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 1, height: 3, material: 'granite', workforce: 'medium', scenario: 1 },
                { location: 'desert', width: 1, height: 3, material: 'granite', workforce: 'large', scenario: 1 },
                { location: 'desert', width: 1, height: 3, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 1, height: 3, material: 'mudbricks', workforce: 'medium', scenario: 1 },
                { location: 'desert', width: 1, height: 3, material: 'mudbricks', workforce: 'large', scenario: 1 },
                { location: 'desert', width: 2, height: 1, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 2, height: 1, material: 'limestone', workforce: 'medium', scenario: 4 },
                { location: 'desert', width: 2, height: 1, material: 'limestone', workforce: 'large', scenario: 4 },
                { location: 'desert', width: 2, height: 1, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 2, height: 1, material: 'granite', workforce: 'medium', scenario: 4 },
                { location: 'desert', width: 2, height: 1, material: 'granite', workforce: 'large', scenario: 4 },
                { location: 'desert', width: 2, height: 1, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 2, height: 1, material: 'mudbricks', workforce: 'medium', scenario: 2 },
                { location: 'desert', width: 2, height: 1, material: 'mudbricks', workforce: 'large', scenario: 2 },
                { location: 'desert', width: 2, height: 2, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 2, height: 2, material: 'limestone', workforce: 'medium', scenario: 4 },
                { location: 'desert', width: 2, height: 2, material: 'limestone', workforce: 'large', scenario: 4 },
                { location: 'desert', width: 2, height: 2, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 2, height: 2, material: 'granite', workforce: 'medium', scenario: 4 },
                { location: 'desert', width: 2, height: 2, material: 'granite', workforce: 'large', scenario: 4 },
                { location: 'desert', width: 2, height: 2, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 2, height: 2, material: 'mudbricks', workforce: 'medium', scenario: 2 },
                { location: 'desert', width: 2, height: 2, material: 'mudbricks', workforce: 'large', scenario: 2 },
                { location: 'desert', width: 2, height: 3, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 2, height: 3, material: 'limestone', workforce: 'medium', scenario: 4 },
                { location: 'desert', width: 2, height: 3, material: 'limestone', workforce: 'large', scenario: 4 },
                { location: 'desert', width: 2, height: 3, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 2, height: 3, material: 'granite', workforce: 'medium', scenario: 4 },
                { location: 'desert', width: 2, height: 3, material: 'granite', workforce: 'large', scenario: 4 },
                { location: 'desert', width: 2, height: 3, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 2, height: 3, material: 'mudbricks', workforce: 'medium', scenario: 2 },
                { location: 'desert', width: 2, height: 3, material: 'mudbricks', workforce: 'large', scenario: 2 },
                { location: 'desert', width: 3, height: 1, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 3, height: 1, material: 'limestone', workforce: 'medium', scenario: 4 },
                { location: 'desert', width: 3, height: 1, material: 'limestone', workforce: 'large', scenario: 2 },
                { location: 'desert', width: 3, height: 1, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 3, height: 1, material: 'granite', workforce: 'medium', scenario: 4 },
                { location: 'desert', width: 3, height: 1, material: 'granite', workforce: 'large', scenario: 4 },
                { location: 'desert', width: 3, height: 1, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 3, height: 1, material: 'mudbricks', workforce: 'medium', scenario: 2 },
                { location: 'desert', width: 3, height: 1, material: 'mudbricks', workforce: 'large', scenario: 2 },
                { location: 'desert', width: 3, height: 2, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 3, height: 2, material: 'limestone', workforce: 'medium', scenario: 4 },
                { location: 'desert', width: 3, height: 2, material: 'limestone', workforce: 'large', scenario: 4 },
                { location: 'desert', width: 3, height: 2, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 3, height: 2, material: 'granite', workforce: 'medium', scenario: 4 },
                { location: 'desert', width: 3, height: 2, material: 'granite', workforce: 'large', scenario: 4 },
                { location: 'desert', width: 3, height: 2, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 3, height: 2, material: 'mudbricks', workforce: 'medium', scenario: 2 },
                { location: 'desert', width: 3, height: 2, material: 'mudbricks', workforce: 'large', scenario: 2 },
                { location: 'desert', width: 3, height: 3, material: 'limestone', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 3, height: 3, material: 'limestone', workforce: 'medium', scenario: 4 },
                { location: 'desert', width: 3, height: 3, material: 'limestone', workforce: 'large', scenario: 4 },
                { location: 'desert', width: 3, height: 3, material: 'granite', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 3, height: 3, material: 'granite', workforce: 'medium', scenario: 4 },
                { location: 'desert', width: 3, height: 3, material: 'granite', workforce: 'large', scenario: 4 },
                { location: 'desert', width: 3, height: 3, material: 'mudbricks', workforce: 'small', scenario: 5 },
                { location: 'desert', width: 3, height: 3, material: 'mudbricks', workforce: 'medium', scenario: 2 },
                { location: 'desert', width: 3, height: 3, material: 'mudbricks', workforce: 'large', scenario: 2 }
            ],

            scenarios: [
                {
                    id: 1,
                    title: 'Oops!',
                    scenario: 'Your pyramid is too steep and is starting to crack! Keep going and it may fall. You could adjust the angle but it may look a bit odd!',
                    options: [
                        { id: 1, text: 'Pray to the gods', icon: 'pray', outcome: 'half', impact: 'half' },
                        { id: 2, text: 'Adjust the angle', icon: 'work-on', outcome: 'bent', impact: 'none' },
                        { id: 3, text: 'Keep working', icon: 'time', outcome: 'rubble', impact: 'zero' }
                    ]
                }, {
                    id: 2,
                    title: 'Bad news!',
                    scenario: 'Your workers are paid in food and it hasn’t arrived! They refuse to work until their rations arrive.',
                    options: [
                        { id: 1, text: 'Ask the Prime Minister for help', icon: 'pray', outcome: 'finished', impact: 'none' },
                        { id: 2, text: 'Stop work until food arrives', icon: 'time', outcome: 'half', impact: 'half' },
                        { id: 3, text: 'Have the workers whipped!', icon: 'work-on', outcome: 'rubble', impact: 'zero' }
                    ]
                }, {
                    id: 3,
                    title: 'A problem!',
                    scenario: 'The ground has flooded and your mud bricks are soggy! You could swap them for a stronger stone or you might end up with a muddy hill.',
                    options: [
                        { id: 1, text: 'Stop work until flood clears', icon: 'time', outcome: 'finished', impact: 'none' },
                        { id: 2, text: 'Swap to limestone', icon: 'work-on', outcome: 'half', impact: 'half' },
                        { id: 3, text: 'Keep working no matter what!', icon: 'pray', outcome: 'rubble', impact: 'zero' }
                    ]
                }, {
                    id: 4,
                    title: 'Oh no!',
                    scenario: 'Your pyramid is a bit unstable. Building on sandy ground wasn\'t a good idea!',
                    options: [
                        { id: 1, text: 'Adjust the size', icon: 'work-on', outcome: 'finished', impact: 'none' },
                        { id: 2, text: 'Keep working no matter what!', icon: 'time', outcome: 'half', impact: 'half' },
                        { id: 3, text: 'Pray to Seth, god of the desert', icon: 'pray', outcome: 'rubble', impact: 'zero' }
                    ]
                }, {
                    id: 5,
                    title: 'Uh oh!',
                    scenario: 'Your workforce are tired and hungry! You could keep going and risk their lives, or let some go home.',
                    options: [
                        { id: 1, text: 'Ask King for more workers', icon: 'work-on', outcome: 'finished', impact: 'none' },
                        { id: 2, text: 'Let some workers go home', icon: 'pray', outcome: 'half', impact: 'half' },
                        { id: 3, text: 'Work them twice as hard!', icon: 'time', outcome: 'rubble', impact: 'zero' }
                    ]
                }
            ],

            scoringMatrix: {
                site: [
                    { location: 'higher-ground', grandeur: 3, longevity: 3, efficiency: 2 },
                    { location: 'riverbank', grandeur: 2, longevity: 2, efficiency: 3 },
                    { location: 'desert', grandeur: 3, longevity: 2, efficiency: 1 }
                ],

                scale: [
                    { width: 1, height: 1, grandeur: 1, longevity: 1, efficiency: 2 },
                    { width: 1, height: 2, grandeur: 2, longevity: 1, efficiency: 2 },
                    { width: 1, height: 3, grandeur: 2, longevity: 1, efficiency: 1 },
                    { width: 2, height: 1, grandeur: 1, longevity: 2, efficiency: 2 },
                    { width: 2, height: 2, grandeur: 2, longevity: 2, efficiency: 2 },
                    { width: 2, height: 3, grandeur: 3, longevity: 2, efficiency: 1 },
                    { width: 3, height: 1, grandeur: 1, longevity: 2, efficiency: 2 },
                    { width: 3, height: 2, grandeur: 2, longevity: 2, efficiency: 2 },
                    { width: 3, height: 3, grandeur: 3, longevity: 3, efficiency: 1 }
                ],

                materials: [
                    { material: 'limestone', grandeur: 2, longevity: 2, efficiency: 2 },
                    { material: 'granite', grandeur: 3, longevity: 3, efficiency: 1 },
                    { material: 'mudbricks', grandeur: 1, longevity: 1, efficiency: 3 }
                ],

                workforce: [
                    { workforceType: 'small', grandeur: 1, longevity: 1, efficiency: 1 },
                    { workforceType: 'medium', grandeur: 2, longevity: 2, efficiency: 3 },
                    { workforceType: 'large', grandeur: 3, longevity: 3, efficiency: 1 }
                ]
            },

            scoreImpactResult:
            {
                zero: 'Oh no!',
                half: 'Nice try!',
                none: 'Well done!'
            }
        },
        sounds: {
            buttonClick: 'assets/audio/button-click.mp3',
            build: 'assets/audio/build.mp3',
            scenarioPopup: 'assets/audio/scenario-popup.mp3',
            scoreReveal: 'assets/audio/score-reveal.mp3'
        }
    }
};
