    // Submit form
    $("#menuFormContent").submit(function (event) {
        console.log("menuFormContent clicked")
        event.preventDefault();
        const menuDate = $("#menuDate").val();
        const day = String(Number(menuDate.split("/")[1])).padStart(2, "0");
        const mealType = $("#mealType").val();
        const recipeName = $("#recipeName").val();
        const foodMateria = $("#foodMateria").val();
        const preparationProcedure = $("#preparationProcedure").val();
        const isEdit = $("#editMode").val() === "true";
        const storageKey = `menu_${currentId}`;
        const recipeData = {
            id: currentId,
            date: menuDate,
            mealType,
            recipeName,
            foodMateria,
            preparationProcedure
        };
        console.log("🚀 ~ file: meal.js:59 ~ isEdit:", isEdit)
        if (isEdit) {
            const prevKey = $("#editMode").data("prevKey");
            console.log("prevKey", prevKey);

            // Remove old data if key has changed
            console.log("🚀 ~ file: meal.js:65 ~ storageKey:", storageKey)
            // 我不太清楚这里的程序是怎么个流程和设计，但看起来是这里把prevKey删掉了
            // 在报错位置需要从local storage取出的时候用的还是原本的prevKey
            // 62行输出了prevKey，值为 menu_7
            // 65行输出了storageKey，值为 menu_8
            if (prevKey && prevKey !== storageKey) {
                localStorage.removeItem(prevKey);
            }
            localStorage.setItem(storageKey, JSON.stringify(recipeData));
            updateCardInTable(day, capitalize(mealType), recipeName);
        } else {
            console.log("currentId ++")
            // 可能是这里在创建时 currentId 自增导致了storageKey的变更
            localStorage.setItem(storageKey, JSON.stringify(recipeData));
            addCardToTable(day, capitalize(mealType), recipeName, storageKey);
            currentId++;
        }
        $("#menuForm").dialog("close");
    });

    $("#menuFormContent").submit(function (event) {
        event.preventDefault();
        const menuDate = $("#menuDate").val();
        const day = String(Number(menuDate.split("/")[1])).padStart(2, "0");
        const mealType = $("#mealType").val();
        const recipeName = $("#recipeName").val();
        const foodMateria = $("#foodMateria").val();
        const preparationProcedure = $("#preparationProcedure").val();
        const isEdit = $("#editMode").val() === "true";

        // 编辑模式下使用原来的key  
        const storageKey = isEdit ? $("#editMode").data("prevKey") : `menu_${currentId}`;

        const recipeData = {
            id: isEdit ? Number(storageKey.split('_')[1]) : currentId, // 保持原有ID  
            date: menuDate,
            mealType,
            recipeName,
            foodMateria,
            preparationProcedure
        };

        // 直接更新数据，不需要删除和重建  
        localStorage.setItem(storageKey, JSON.stringify(recipeData));

        if (isEdit) {
            updateCardInTable(day, capitalize(mealType), recipeName);
        } else {
            addCardToTable(day, capitalize(mealType), recipeName, storageKey);
            currentId++;
        }

        $("#menuForm").dialog("close");
    });
