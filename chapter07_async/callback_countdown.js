console.log('Three');
setTimeout(
    () => {
        console.log('Two');
        setTimeout(
            () => {
                console.log('One');
                setTimeout(
                    () => {
                        console.log('Go!');
                    },
                    1000
                );
            },
            1000
        );
    },
    1000
);